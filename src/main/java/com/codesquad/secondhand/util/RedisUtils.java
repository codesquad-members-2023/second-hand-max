package com.codesquad.secondhand.util;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

@Component
public class RedisUtils {

	private StringRedisTemplate template;
	private ValueOperations<String, String> valueOperations;

	public RedisUtils(StringRedisTemplate template) {
		this.template = template;
		this.valueOperations = template.opsForValue();
	}

	public String getData(String key) {
		return valueOperations.get(key);
	}

	// 데이터 저장 시 만료시간을 유동적으로 설정 => 데이터마다 만료시간을 다르게 설정 가능
	public void setData(String key, String value, Duration timeout) {
		valueOperations.set(key, value, timeout);
	}

	public void deleteData(String key) {
		template.delete(key);
	}

	public void increment(String key) {
		valueOperations.increment(key);
	}

	// 커서가 0이 될 때까지 count만큼씩 나눠서 key를 가져옴
	public List<String> getKeys(String pattern, int count) {
		ScanOptions options = ScanOptions.scanOptions()
			.match(pattern)
			.count(count)
			.build();
		Map<String, Long> keyExpireMap = new HashMap<>();

		// count 씩 끊어서 처리
		try (Cursor<String> cursor = template.scan(options)) {
			while (cursor.hasNext()) {
				String key = cursor.next();
				Long expiration = template.getExpire(key, TimeUnit.SECONDS);
				if (expiration != null && expiration > 0) {
					keyExpireMap.put(key, expiration);
				}
			}
		}

		List<String> keysSortedByExpiration = new ArrayList<>(keyExpireMap.keySet());
		keysSortedByExpiration.sort(Comparator.comparing(keyExpireMap::get));
		return keysSortedByExpiration;
	}

	public String createKey(String keyType, Long keyId) {
		return keyType + "::" + keyId;
	}

	public Long extractIdFrom(String key) {
		return Long.parseLong(key.split("::")[1]);
	}
}
