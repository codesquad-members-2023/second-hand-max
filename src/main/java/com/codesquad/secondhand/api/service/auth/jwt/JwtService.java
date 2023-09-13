package com.codesquad.secondhand.api.service.auth.jwt;

import java.time.Duration;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.service.auth.response.SignInResponse;
import com.codesquad.secondhand.domain.auth.RedisAuthRepository;
import com.codesquad.secondhand.domain.auth.RefreshToken;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.exception.auth.ExpiredTokenException;
import com.codesquad.secondhand.exception.auth.InvalidTokenException;
import com.codesquad.secondhand.exception.auth.UnauthorizedUserException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class JwtService {

	private static final String PREFIX = "Bearer ";
	private static final Duration ACCESS_TOKEN_DURATION = Duration.ofHours(1);
	private static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(14);

	private final JwtProperties jwtProperties;
	private final RedisAuthRepository redisAuthRepository;

	@Transactional
	public SignInResponse issueTokens(User user) {
		String accessToken = generateToken(user, ACCESS_TOKEN_DURATION);
		String refreshToken = generateToken(user, REFRESH_TOKEN_DURATION);
		redisAuthRepository.saveRefreshToken(new RefreshToken(user.getId(), refreshToken));

		return new SignInResponse(accessToken, refreshToken);
	}

	public String reissueAccessToken(User user) {
		return generateToken(user, ACCESS_TOKEN_DURATION);
	}

	public void deleteRefreshToken(Long userId) {
		redisAuthRepository.deleteRefreshTokenByUserId(userId);
	}

	public Claims parse(String authorizationHeader) {
		validateAuthorizationHeader(authorizationHeader);
		String token = extract(authorizationHeader);

		try {
			return Jwts.parser()
				.setSigningKey(jwtProperties.getSecretKey())
				.parseClaimsJws(token)
				.getBody();
		} catch (ExpiredJwtException e) {
			throw new ExpiredTokenException();
		} catch (UnsupportedJwtException | MalformedJwtException | SignatureException e) {
			throw new InvalidTokenException();
		}
	}

	public void validateAccessToken(String accessToken) {
		if (redisAuthRepository.hasKeyInBlacklist(extract(accessToken))) {
			throw new InvalidTokenException();
		}
	}

	public void validateRefreshToken(User user, String refreshToken) {
		RefreshToken token = redisAuthRepository.findByUserId(user.getId())
			.orElseThrow(ExpiredTokenException::new);

		if (!token.getRefreshToken().equals(extract(refreshToken))) {
			throw new InvalidTokenException();
		}
	}

	public void saveAccessTokenInBlacklist(String authorizationHeader) {
		String accessToken = extract(authorizationHeader);
		redisAuthRepository.saveInvalidAccessToken(accessToken, extractExpiration(accessToken));
	}

	private Long extractExpiration(String accessToken) {
		Date expiration = Jwts.parser()
			.setSigningKey(jwtProperties.getSecretKey())
			.parseClaimsJws(accessToken)
			.getBody().getExpiration();

		return expiration.getTime() - new Date().getTime();
	}

	private String generateToken(User user, Duration expiry) {
		Date now = new Date();
		Date expiredAt = new Date(now.getTime() + expiry.toMillis());

		return Jwts.builder()
			.setHeaderParam(Header.TYPE, Header.JWT_TYPE)
			.setIssuer(jwtProperties.getIssuer())
			.setIssuedAt(now)
			.setExpiration(expiredAt)
			.claim("id", user.getId())
			.signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())
			.compact();
	}

	private String extract(String authorizationHeader) {
		return authorizationHeader.substring(PREFIX.length());
	}

	private void validateAuthorizationHeader(String header) {
		if (header == null || !header.startsWith(PREFIX)) {
			throw new UnauthorizedUserException();
		}
	}

}
