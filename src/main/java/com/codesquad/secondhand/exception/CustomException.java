package com.codesquad.secondhand.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

	private final HttpStatus httpStatus;
	private final String message;

	public CustomException(ErrorResponse errorResponse) {
		this.httpStatus = errorResponse.getHttpStatus();
		this.message = errorResponse.getMessage();
	}
}
