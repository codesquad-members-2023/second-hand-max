package com.codesquad.secondhand.api.service.item.response;

import java.time.LocalDateTime;

import com.codesquad.secondhand.domain.item.Item;

import lombok.AllArgsConstructor;
import lombok.Getter;

// todo : numChat, numLike 추가
@AllArgsConstructor
@Getter
public class ItemResponse {
	private Long id;
	private String title;
	private String region;
	private String status;
	private String thumbnail;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Integer price;

	public static ItemResponse from(Item item) {
		return new ItemResponse(item.getId(), item.getTitle(), item.getRegion().getTitle(),
			item.getItemStatus().getType(), item.getItemImages().get(0).getImageUrl(), item.getCreatedAt(),
			item.getUpdatedAt(), item.getPrice());
	}

}
