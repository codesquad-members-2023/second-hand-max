package com.codesquad.secondhand.exception.image;

public class NoSuchImageException extends RuntimeException {

	private final static String MESSAGE = "존재하지 않는 이미지입니다";

	public NoSuchImageException() {
		super(MESSAGE);
	}
}
