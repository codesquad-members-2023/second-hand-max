package com.codesquad.secondhand.exception.common;

public class InvalidCursorException extends RuntimeException {

	private static final String MESSAGE = "cursor는 0 이상의 숫자여야 합니다";

	public InvalidCursorException() {
		super(MESSAGE);
	}

}
