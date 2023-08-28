package com.codesquad.secondhand.exception.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.codesquad.secondhand.api.ApiResponse;

@RestControllerAdvice
public class UserExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(NoSuchUserException.class)
	public ApiResponse<Void> handleNoSuchUserException(NoSuchUserException exception) {
		return ApiResponse.of(HttpStatus.BAD_REQUEST, exception.getMessage(), null);
	}

}
