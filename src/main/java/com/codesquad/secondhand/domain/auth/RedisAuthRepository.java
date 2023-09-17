package com.codesquad.secondhand.domain.auth;

import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class RedisAuthRepository {

	private static final String PREFIX = "user:";

	private final RedisTemplate<String, String> redisTemplate;

	public void saveRefreshToken(RefreshToken refreshToken) {
		ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
		valueOperations.set(PREFIX + refreshToken.getUserId(), refreshToken.getRefreshToken());
		redisTemplate.expire(PREFIX + refreshToken.getUserId(), 1L, TimeUnit.HOURS);
	}

	public Optional<RefreshToken> findByUserId(Long userId) {
		ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
		String findToken = valueOperations.get(PREFIX + userId);

		if (Objects.isNull(findToken)) {
			return Optional.empty();
		}
		return Optional.of(new RefreshToken(userId, findToken));
	}

	public void deleteRefreshTokenByUserId(Long userId) {
		redisTemplate.unlink(PREFIX + userId);
	}

	public void saveInvalidAccessToken(String accessToken, Long expiration) {
		ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
		valueOperations.set(accessToken, "invalid_access_token");
		redisTemplate.expire(accessToken, expiration, TimeUnit.MILLISECONDS);
	}

	public boolean hasKeyInBlacklist(String accessToken) {
		return Boolean.TRUE.equals(redisTemplate.hasKey(accessToken));
	}

}
