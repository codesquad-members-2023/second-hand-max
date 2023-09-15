package com.codesquad.secondhand.api.service.user.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.codesquad.secondhand.domain.item.Item;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserTransactionResponse {

	private Long id;
	private String title;
	private String region;
	private String status;
	private Long sellerId;
	private String thumbnail;
	private LocalDateTime updatedAt;
	private Integer price;
	private int numChat;
	private int numLikes;

	public static UserTransactionResponse from(Item item) {
		return new UserTransactionResponse(
			item.getId(),
			item.getTitle(),
			item.getRegion().getTitle(),
			item.getStatus().getType(),
			item.getUser().getId(),
			item.getThumbnailUrl(),
			item.getCreatedAt(),
			item.getPrice(),
			item.getNumChat(),
			item.getNumLikes()
		);
	}

	public static List<UserTransactionResponse> from(List<Item> items) {
		return items.stream()
			.map(UserTransactionResponse::from)
			.collect(Collectors.toUnmodifiableList());
	}
}
