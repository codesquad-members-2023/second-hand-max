package com.codesquad.secondhand.exception.wishlist;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class NoSuchWishlistException extends CustomException {

	public NoSuchWishlistException() {
		super(ErrorResponse.NO_SUCH_WISHLIST_EXCEPTION);
	}

}
