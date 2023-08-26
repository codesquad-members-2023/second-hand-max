package com.codesquad.secondhand.api.service.user_region.exception;

public class MinimumUserRegionViolationException extends RuntimeException {

	private static final String MESSAGE = "최소 1개의 동네는 필수입니다. 동네 삭제 요청이 거부되었습니다.";

	public MinimumUserRegionViolationException() {
		super(MESSAGE);
	}

}
