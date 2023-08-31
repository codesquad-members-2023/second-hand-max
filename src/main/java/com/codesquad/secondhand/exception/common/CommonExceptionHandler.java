package com.codesquad.secondhand.exception.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.codesquad.secondhand.api.ApiResponse;

@RestControllerAdvice
public class CommonExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(InvalidCursorException.class)
	public ApiResponse<Void> handleUserRegionException(InvalidCursorException exception) {
		return ApiResponse.noData(HttpStatus.BAD_REQUEST, exception.getMessage());
	}

}
