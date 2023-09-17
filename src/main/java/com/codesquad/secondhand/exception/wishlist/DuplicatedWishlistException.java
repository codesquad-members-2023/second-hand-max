package com.codesquad.secondhand.exception.wishlist;

public class DuplicatedWishlistException extends RuntimeException {

	private static final String MESSAGE = "이미 관심 목록에 담은 상품입니다";

	public DuplicatedWishlistException() {
		super(MESSAGE);
	}

}
