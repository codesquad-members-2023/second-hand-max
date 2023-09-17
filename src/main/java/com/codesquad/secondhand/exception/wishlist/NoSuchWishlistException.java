package com.codesquad.secondhand.exception.wishlist;

public class NoSuchWishlistException extends RuntimeException {

	private static final String MESSAGE = "관심 목록에 없는 상품입니다";

	public NoSuchWishlistException() {
		super(MESSAGE);
	}

}
