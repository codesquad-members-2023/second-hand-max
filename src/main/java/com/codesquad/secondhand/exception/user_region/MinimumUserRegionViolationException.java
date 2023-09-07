package com.codesquad.secondhand.exception.user_region;

public class MinimumUserRegionViolationException extends RuntimeException {

	private static final String MESSAGE = "최소 1개의 동네는 필수입니다";

	public MinimumUserRegionViolationException() {
		super(MESSAGE);
	}

}
