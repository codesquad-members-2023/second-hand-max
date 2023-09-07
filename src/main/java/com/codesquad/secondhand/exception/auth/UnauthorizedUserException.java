package com.codesquad.secondhand.exception.auth;

public class UnauthorizedUserException extends RuntimeException {

	private static final String MESSAGE = "인증되지 않은 사용자입니다";

	public UnauthorizedUserException() {
		super(MESSAGE);
	}

}
