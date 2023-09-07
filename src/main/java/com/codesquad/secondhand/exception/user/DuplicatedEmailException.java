package com.codesquad.secondhand.exception.user;

public class DuplicatedEmailException extends RuntimeException {
	private static final String MESSAGE = "이미 존재하는 이메일입니다";

	public DuplicatedEmailException() {
		super(MESSAGE);
	}

}
