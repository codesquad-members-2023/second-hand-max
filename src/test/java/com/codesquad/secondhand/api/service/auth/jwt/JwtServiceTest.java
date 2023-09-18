package com.codesquad.secondhand.api.service.auth.jwt;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.Duration;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import com.codesquad.secondhand.exception.ErrorResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.api.service.auth.response.SignInResponse;
import com.codesquad.secondhand.domain.auth.RedisAuthRepository;
import com.codesquad.secondhand.domain.auth.RefreshToken;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.exception.auth.ExpiredTokenException;
import com.codesquad.secondhand.exception.auth.InvalidTokenException;

import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

class JwtServiceTest extends IntegrationTestSupport {

	@Autowired
	private JwtProperties jwtProperties;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RegionRepository regionRepository;

	@Autowired
	private RedisAuthRepository redisAuthRepository;

	@DisplayName("사용자의 access token과 refresh token을 발급하고 refresh token은 DB에 저장한다.")
	@Test
	void issueTokens() {
		// given
		Region defaultRegion = regionRepository.save(Region.ofDefault());
		User user = FixtureFactory.createUserFixture(List.of(defaultRegion));
		User savedUser = userRepository.save(user);
		SignInResponse tokens = jwtService.issueTokens(user);

		// when
		RefreshToken refreshToken = redisAuthRepository.findByUserId(savedUser.getId()).orElseThrow();

		// then
		assertAll(
			() -> assertThat(refreshToken.getUserId()).isEqualTo(savedUser.getId()),
			() -> assertThat(refreshToken.getRefreshToken()).isEqualTo(tokens.getRefreshToken())
		);
	}

	@DisplayName("JWT 토큰 검증 시나리오")
	@TestFactory
	Collection<DynamicTest> validateToken() {
		return List.of(
			DynamicTest.dynamicTest("만료된 Access Token을 받았을 때 예외가 발생한다.", () -> {
				// given
				String expiredToken = Jwts.builder()
					.setHeaderParam(Header.TYPE, Header.JWT_TYPE)
					.setIssuer(jwtProperties.getIssuer())
					.setIssuedAt(new Date())
					.setExpiration(new Date())
					.claim("id", 1L)
					.signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())
					.compact();

				// when // then
				assertThatThrownBy(() -> jwtService.parse("Bearer " + expiredToken))
					.isInstanceOf(ExpiredTokenException.class)
					.hasMessage(ErrorResponse.EXPIRED_TOKEN_EXCEPTION.getMessage());
			}),
			DynamicTest.dynamicTest("변조된 Access Token을 받았을 때 예외가 발생한다.", () -> {
				// given
				Date now = new Date();
				Date expiredAt = new Date(now.getTime() + Duration.ofMinutes(5).toMillis());

				String invalidToken = Jwts.builder()
					.setHeaderParam(Header.TYPE, Header.JWT_TYPE)
					.setIssuer(jwtProperties.getIssuer())
					.setIssuedAt(now)
					.setExpiration(expiredAt)
					.claim("id", 1L)
					.signWith(SignatureAlgorithm.HS256, "invalidSecret")
					.compact();

				// when // then
				assertThatThrownBy(() -> jwtService.parse("Bearer " + invalidToken))
					.isInstanceOf(InvalidTokenException.class)
					.hasMessage(ErrorResponse.INVALID_TOKEN_EXCEPTION.getMessage());
			})
		);
	}

}
