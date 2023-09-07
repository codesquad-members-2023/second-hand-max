package com.codesquad.secondhand.exception.auth;

public class ExpiredTokenException extends RuntimeException {

	private static final String MESSAGE = "Access Token이 만료되었습니다";

	public ExpiredTokenException() {
		super(MESSAGE);
	}

}
