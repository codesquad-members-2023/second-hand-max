package com.codesquad.secondhand.exception.item;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.codesquad.secondhand.api.ApiResponse;

@RestControllerAdvice
public class ItemExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(NoSuchItemException.class)
	public ApiResponse<Void> handleNoSuchItemException(NoSuchItemException exception) {
		return ApiResponse.noData(HttpStatus.BAD_REQUEST, exception.getMessage());
	}
}
