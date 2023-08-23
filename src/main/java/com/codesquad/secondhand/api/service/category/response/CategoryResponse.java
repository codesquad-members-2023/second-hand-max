package com.codesquad.secondhand.api.service.category.response;

import com.codesquad.secondhand.domain.category.Category;

import lombok.Getter;

@Getter
public class CategoryResponse {

	private final Long id;
	private final String title;
	private final String imageUrl;

	public CategoryResponse(Long id, String title, String imageUrl) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
	}

	public static CategoryResponse from(Category category) {
		return new CategoryResponse(category.getId(), category.getTitle(), category.getImageUrl());
	}
}
