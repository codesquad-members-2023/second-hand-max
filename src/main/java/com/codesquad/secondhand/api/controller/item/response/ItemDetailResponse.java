package com.codesquad.secondhand.api.controller.item.response;

import java.time.LocalDateTime;
import java.util.List;

import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.item.Item;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
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
	private int numLikes;
	private Long numViews;
	private boolean isLiked;
	private List<Image> images;

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getStatus() {
		return status;
	}

	public String getContent() {
		return content;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public Integer getPrice() {
		return price;
	}

	public String getCategory() {
		return category;
	}

	public ItemSellerResponse getSeller() {
		return seller;
	}

	public int getNumChat() {
		return numChat;
	}

	public int getNumLikes() {
		return numLikes;
	}

	public Long getNumViews() {
		return numViews;
	}

	public boolean getIsLiked() {
		return isLiked;
	}

	public List<Image> getImages() {
		return images;
	}

	public static ItemDetailResponse from(Item item, Long userId) {
		return new ItemDetailResponse(item.getId(), item.getTitle(), item.getStatus().getType(), item.getContent(),
			item.getUpdatedAt(), item.getPrice(), item.getCategory().getTitle(),
			ItemSellerResponse.from(item.getUser()), item.getNumChat(), item.getNumLikes(), item.getViews(),
			item.isInWishlist(userId), item.listImage());
	}

}
