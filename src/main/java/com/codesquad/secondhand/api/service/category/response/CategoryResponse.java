package com.codesquad.secondhand.api.service.category.response;

import com.codesquad.secondhand.domain.category.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CategoryResponse {

	private final Long id;
	private final String title;
	private final String imageUrl;

	public static CategoryResponse from(Category category) {
		return new CategoryResponse(category.getId(), category.getTitle(), category.getImageUrl());
	}

}
