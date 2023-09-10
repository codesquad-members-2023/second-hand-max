package com.codesquad.secondhand.exception.category;

public class NoSuchCategoryException extends RuntimeException {

	private static final String MESSAGE = "존재하지 않는 카테고리입니다";

	public NoSuchCategoryException() {
		super(MESSAGE);
	}

}
