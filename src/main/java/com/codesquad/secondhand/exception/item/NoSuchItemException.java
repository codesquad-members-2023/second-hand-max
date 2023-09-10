package com.codesquad.secondhand.exception.item;

public class NoSuchItemException extends RuntimeException {

	private static final String MESSAGE = "존재하지 않는 상품입니다";

	public NoSuchItemException() {
		super(MESSAGE);
	}
}
