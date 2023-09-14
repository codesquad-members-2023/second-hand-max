package com.codesquad.secondhand.api.service.auth;

import static org.assertj.core.api.Assertions.*;

import java.util.Collection;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.annotation.SignInUser;
import com.codesquad.secondhand.api.controller.auth.request.SignInRequest;
import com.codesquad.secondhand.api.service.auth.jwt.JwtService;
import com.codesquad.secondhand.api.service.auth.response.SignInResponse;
import com.codesquad.secondhand.api.service.user.UserService;
import com.codesquad.secondhand.domain.auth.RefreshToken;
import com.codesquad.secondhand.domain.auth.RefreshTokenRepository;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;

class AuthServiceTest extends IntegrationTestSupport {

	@Autowired
	private AuthService authService;

	@Autowired
	private UserService userService;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RegionRepository regionRepository;

	@Autowired
	private RefreshTokenRepository refreshTokenRepository;

	// todo : 오류 수정
	@DisplayName("사용자 로그인 로그아웃 시나리오")
	@TestFactory
	Collection<DynamicTest> signInAndOut() {
		// given
		Region defaultRegion = regionRepository.save(Region.ofDefault());
		User user = userRepository.save(FixtureFactory.createUserFixture(List.of(defaultRegion)));

		return List.of(
			DynamicTest.dynamicTest("사용자가 로그인에 성공한다.", () -> {
				// given
				SignInRequest request = new SignInRequest("test@email.com", "password123!");

				// when
				SignInResponse response = authService.signIn(request);
				RefreshToken refreshToken = refreshTokenRepository.findByUserId(user.getId()).orElseThrow();

				// then
				assertThat(response.getRefreshToken()).isEqualTo(refreshToken.getToken());
			}),
			DynamicTest.dynamicTest("로그인한 사용자가 로그아웃에 성공한다.", () -> {
				// when
				authService.signOut(new SignInUser(user.getId()));

				// then
				assertThat(refreshTokenRepository.findByUserId(user.getId())).isEmpty();
			})
		);
	}

}
