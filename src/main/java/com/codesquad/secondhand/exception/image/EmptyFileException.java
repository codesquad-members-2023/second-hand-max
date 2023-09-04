package com.codesquad.secondhand.exception.image;

public class EmptyFileException extends RuntimeException {

	private static final String MESSAGE = "파일이 비어있습니다";

	public EmptyFileException() {
		super(MESSAGE);
	}

}
