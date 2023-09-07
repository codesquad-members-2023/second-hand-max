package com.codesquad.secondhand.api.service.item.response;

import java.time.LocalDateTime;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;

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
	private Long numChat;
	private Long numLike;

	@QueryProjection
	public ItemResponse(Long id, String title, String region, String status, String imageUrl,
		LocalDateTime createdAt,
		LocalDateTime updatedAt, Integer price, Long numChat, Long numLike) {
		this.id = id;
		this.title = title;
		this.region = region;
		this.status = status;
		this.thumbnail = imageUrl;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.price = price;
		this.numChat = numChat;
		this.numLike = numLike;
	}

}
