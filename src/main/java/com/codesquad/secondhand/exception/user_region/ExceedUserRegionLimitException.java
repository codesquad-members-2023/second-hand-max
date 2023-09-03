package com.codesquad.secondhand.exception.user_region;

public class ExceedUserRegionLimitException extends RuntimeException {

	private static final String MESSAGE = "동네 등록 수가 최대 제한을 초과했습니다. 동네 등록 요청이 거부되었습니다.";

	public ExceedUserRegionLimitException() {
		super(MESSAGE);
	}

}
