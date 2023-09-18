package com.codesquad.secondhand.api.service.item.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.codesquad.secondhand.domain.item.Item;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ItemResponse {
	private Long id;
	private String title;
	private String region;
	private String status;
	private Long sellerId;
	private String thumbnailUrl;
	private LocalDateTime updatedAt;
	private Integer price;
	private int numChat;
	private int numLikes;

	public static ItemResponse from(Item item) {
		return new ItemResponse(
			item.getId(),
			item.getTitle(),
			item.getRegion().getTitle(),
			item.getStatus().getType(),
			item.getUser().getId(),
			item.getThumbnailUrl(),
			item.getUpdatedAt(),
			item.getPrice(),
			item.getNumChat(),
			item.getNumLikes()
		);
	}

	public static List<ItemResponse> from(List<Item> items) {
		return items.stream()
			.map(ItemResponse::from)
			.collect(Collectors.toUnmodifiableList());
	}
}
