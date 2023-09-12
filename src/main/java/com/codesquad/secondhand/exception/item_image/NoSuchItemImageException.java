package com.codesquad.secondhand.exception.item_image;

public class NoSuchItemImageException extends RuntimeException {
	private final static String MESSAGE = "존재하지 않는 상품 이미지입니다";

	public NoSuchItemImageException() {
		super(MESSAGE);
	}
}
