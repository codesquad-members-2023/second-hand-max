package com.codesquad.secondhand.api.service.wishlist.response;

import java.time.LocalDateTime;

import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.wishlist.Wishlist;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class WishlistResponse {

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
	private WishlistCategory category;

	public static WishlistResponse from(Wishlist wishlist) {
		final Item item = wishlist.getItem();
		return new WishlistResponse(
			item.getId(),
			item.getTitle(),
			item.getRegion().getTitle(),
			item.getStatus().getType(),
			item.getUser().getId(),
			item.getThumbnailUrl(),
			item.getUpdatedAt(),
			item.getPrice(),
			item.getNumChat(),
			item.getNumLikes(),
			WishlistCategory.from(item.getCategory()));
	}

}
