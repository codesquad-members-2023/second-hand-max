package com.codesquad.secondhand.exception.status;

public class NoSuchStatusException extends RuntimeException {

	private static final String MESSAGE = "존재하지 않는 상품 상태입니다";

	public NoSuchStatusException() {
		super(MESSAGE);
	}
}
