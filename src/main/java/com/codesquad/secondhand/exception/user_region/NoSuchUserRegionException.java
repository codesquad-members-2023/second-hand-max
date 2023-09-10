package com.codesquad.secondhand.exception.user_region;

public class NoSuchUserRegionException extends RuntimeException {

	private static final String MESSAGE = "사용자 동네 목록에 없는 동네입니다";

	public NoSuchUserRegionException() {
		super(MESSAGE);
	}

}
