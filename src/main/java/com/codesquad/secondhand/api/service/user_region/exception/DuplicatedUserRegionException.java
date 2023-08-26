package com.codesquad.secondhand.api.service.user_region.exception;

public class DuplicatedUserRegionException extends RuntimeException {

	private static final String MESSAGE = "이미 등록된 동네입니다.";

	public DuplicatedUserRegionException() {
		super(MESSAGE);
	}

}
