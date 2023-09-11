package com.codesquad.secondhand.exception.auth;

public class PermissionDeniedException extends RuntimeException {

	private static final String MESSAGE = "허가되지 않은 접근입니다";

	public PermissionDeniedException() {
		super(MESSAGE);
	}
}
