package com.codesquad.secondhand.domain.item;

import java.time.LocalDateTime;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Item {

	private Long id;
	private Long userId;
	private Long categoryId;
	private Long regionId;
	private String title;
	private String content;
	private int price;
	private ItemStatus status;
	private int views;
	private LocalDateTime postedAt;
	private LocalDateTime updatedAt;
	private boolean isDeleted;

}
