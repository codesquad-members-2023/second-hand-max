package com.codesquad.secondhand.exception.wishlist;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class DuplicatedWishlistException extends CustomException {

	public DuplicatedWishlistException() {
		super(ErrorResponse.DUPLICATED_WISHLIST_EXCEPTION);
	}

}
