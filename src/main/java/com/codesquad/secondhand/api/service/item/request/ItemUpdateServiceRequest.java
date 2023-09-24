package com.codesquad.secondhand.api.service.item.request;

import java.util.List;

import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.exception.category.InvalidCategoryException;

import lombok.Getter;

@Getter
public class ItemUpdateServiceRequest {

	private Long id;
	private String title;
	private Integer price;
	private String content;
	private List<Image> images;
	private Long categoryId;
	private Long regionId;

	public ItemUpdateServiceRequest(Long id, String title, Integer price, String content, List<Image> images,
		Long categoryId, Long regionId) {
		validateCategory(categoryId);
		this.id = id;
		this.title = title;
		this.price = price;
		this.content = content;
		this.images = images;
		this.categoryId = categoryId;
		this.regionId = regionId;
	}

	private void validateCategory(Long categoryId) {
		if (categoryId.equals(Category.ofAll().getId())) {
			throw new InvalidCategoryException();
		}
	}

}
