package com.codesquad.secondhand.api.controller.item.response;

import java.time.LocalDateTime;
import java.util.List;

import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.item.Item;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ItemDetailResponse {

	private Long id;
	private String title;
	private String status;
	private String content;
	private LocalDateTime updatedAt;
	private Integer price;
	private String category;
	private ItemSellerResponse seller;
	private int numChat;
	private int numLike;
	private Long numViews;
	private List<Image> images;

	public static ItemDetailResponse from(Item item) {
		return new ItemDetailResponse(item.getId(), item.getTitle(), item.getStatus().getType(), item.getContent(),
			item.getUpdatedAt(), item.getPrice(), item.getCategory().getTitle(), ItemSellerResponse.from(item.getUser()),
			item.getNumChat(), item.getNumLike(), item.getViews(),item.listImage());
	}

}
