package com.codesquad.secondhand.api.controller.item.response;

import com.codesquad.secondhand.domain.category.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ItemCategoryResponse {

	private Long id;
	private String title;

	public static ItemCategoryResponse from(Category category) {
		return new ItemCategoryResponse(category.getId(), category.getTitle());
	}
}
