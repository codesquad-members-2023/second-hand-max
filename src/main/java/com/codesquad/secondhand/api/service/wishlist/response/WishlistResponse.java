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
	private String thumbnailUrl;
	private LocalDateTime updatedAt;
	private int price;
	private int numChat;
	private int numLikes;

	public static WishlistResponse from(Wishlist wishlist) {
		return new WishlistResponse(
			wishlist.getItem().getId(),
			wishlist.getItem().getTitle(),
			wishlist.getItem().getRegion().getTitle(),
			wishlist.getItem().getStatus().getType(),
			!wishlist.getItem().getDetailShot().listAllImages().isEmpty() ?
				wishlist.getItem().getDetailShot().listAllImages().get(0).getImageUrl() : null,
			wishlist.getItem().getUpdatedAt(),
			wishlist.getItem().getPrice(),
			wishlist.getItem().getNumChat(),
			wishlist.getItem().getPrice());
	}

}
