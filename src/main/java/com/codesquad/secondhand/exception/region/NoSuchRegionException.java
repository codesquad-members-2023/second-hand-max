package com.codesquad.secondhand.exception.region;

public class NoSuchRegionException extends RuntimeException {

	private static final String MESSAGE = "존재하지 않는 동네입니다";

	public NoSuchRegionException() {
		super(MESSAGE);
	}

}
