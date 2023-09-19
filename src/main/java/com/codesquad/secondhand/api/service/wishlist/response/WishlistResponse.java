package com.codesquad.secondhand.api.service.wishlist.response;

import java.time.LocalDateTime;

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
	private WishlistCategory category;
	private LocalDateTime updatedAt;
	private Integer price;
	private int numChat;
	private int numLikes;

	public static WishlistResponse from(Wishlist wishlist) {
		return new WishlistResponse(
			wishlist.getItemId(),
			wishlist.getItemTitle(),
			wishlist.getItemRegionTitle(),
			wishlist.getItemStatusType(),
			wishlist.getItemSellerId(),
			wishlist.getItemThumbnailUrl(),
			WishlistCategory.from(wishlist.getItem().getCategory()),
			wishlist.getItemUpdatedAt(),
			wishlist.getItemPrice(),
			wishlist.getItemNumChat(),
			wishlist.getItemNumLikes());
	}

}
