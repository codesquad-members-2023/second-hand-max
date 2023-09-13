package com.codesquad.secondhand.api.service.wishlist.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class WishlistSliceResponse {

	private boolean hasMore;
	private List<WishlistResponse> items;

}
