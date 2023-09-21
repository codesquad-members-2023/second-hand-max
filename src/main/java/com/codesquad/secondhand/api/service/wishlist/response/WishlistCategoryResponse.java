package com.codesquad.secondhand.api.service.wishlist.response;

import java.util.ArrayList;
import java.util.List;

import com.codesquad.secondhand.domain.category.Category;

import lombok.Getter;

@Getter
public class WishlistCategoryResponse {

	private final List<WishlistCategory> categories;

	public WishlistCategoryResponse(List<WishlistCategory> categories) {
		this.categories = new ArrayList<>();
		this.categories.add(WishlistCategory.from(Category.ofAll()));
		this.categories.addAll(categories);
	}

}
