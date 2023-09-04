package com.codesquad.secondhand.exception.image;

public class InvalidExtensionException extends RuntimeException {

	private static final String MESSAGE = "허용하지 않는 확장자입니다.";

	public InvalidExtensionException() {
		super(MESSAGE);
	}

}
