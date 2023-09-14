package com.codesquad.secondhand.api.service.user.response;

import java.time.LocalDateTime;

import com.codesquad.secondhand.domain.item.DetailShot;

import lombok.Getter;

@Getter
public class UserTransactionResponse {

	private Long id;
	private String title;
	private String region;
	private DetailShot detailShot;
	private LocalDateTime updatedAt;
	private Integer price;

	public UserTransactionResponse(Long id, String title, String region, DetailShot detailShot, LocalDateTime updatedAt,
		Integer price) {
		this.id = id;
		this.title = title;
		this.region = region;
		this.detailShot = detailShot;
		this.updatedAt = updatedAt;
		this.price = price;
	}
}
