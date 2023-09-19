package com.codesquad.secondhand.api.service.wishlist.response;

import com.codesquad.secondhand.domain.category.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class WishlistCategory {

	private Long id;
	private String title;

	public static WishlistCategory from(Category category) {
		return new WishlistCategory(category.getId(), category.getTitle());
	}

}
