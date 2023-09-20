package com.codesquad.secondhand.api.service.redis;

import java.time.Duration;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.codesquad.secondhand.domain.item.ItemRepository;
import com.codesquad.secondhand.util.RedisUtils;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RedisService {

	public static final String ITEM_KEY = "itemViews";
	public static final int SCAN_COUNT = 100;
	// public static final int DURATION = 1800;
	// public static final int REPEAT_CYCLE = 600 * 1000;

	public static final int DURATION = 30;
	public static final int REPEAT_CYCLE = 5 * 1000;
	private final ItemRepository itemRepository;
	private final RedisUtils redisUtils;

	public void incrementViews(Long itemId) {
		String viewKey = redisUtils.createKey(ITEM_KEY, itemId);
		if (redisUtils.getData(viewKey) == null) {
			redisUtils.setData(viewKey, String.valueOf(0), Duration.ofSeconds(DURATION));
		}
		redisUtils.increment(viewKey);
	}

	@Scheduled(fixedDelay = REPEAT_CYCLE)
	@Transactional
	public void sendToMySqlAndDelete() {
		List<String> viewKeys = redisUtils.getKeys(ITEM_KEY + "*", SCAN_COUNT);

		if (viewKeys.isEmpty()) {
			return;
		}

		for (String key : viewKeys) {
			Long id = redisUtils.extractIdFrom(key);
			int numViews = Integer.parseInt(redisUtils.getData(key));
			itemRepository.saveViewsFromRedis(id, numViews);
			redisUtils.deleteData(key);
		}
	}

}
