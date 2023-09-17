package com.codesquad.secondhand.api.service.item.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.codesquad.secondhand.domain.item.Item;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ItemTransactionResponse {

	private Long id;
	private String title;
	private String region;
	private String thumbnailUrl;
	private LocalDateTime updatedAt;
	private Integer price;

	public static ItemTransactionResponse from(Item item) {
		return new ItemTransactionResponse(
			item.getId(),
			item.getTitle(),
			item.getRegion().getTitle(),
			item.getThumbnailUrl(),
			item.getUpdatedAt(),
			item.getPrice()
		);
	}

	public static List<ItemTransactionResponse> from(List<Item> items) {
		return items.stream()
			.map(ItemTransactionResponse::from)
			.collect(Collectors.toUnmodifiableList());
	}

}
