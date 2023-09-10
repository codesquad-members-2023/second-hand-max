package com.codesquad.secondhand.exception.auth;

public class SignInFailedException extends RuntimeException {

	private static final String MESSAGE = "이메일 또는 비밀번호가 일치하지 않습니다";

	public SignInFailedException() {
		super(MESSAGE);
	}

}
