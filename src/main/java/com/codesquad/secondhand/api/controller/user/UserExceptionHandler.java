package com.codesquad.secondhand.api.controller.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.service.user.exception.NoSuchUserException;

@RestControllerAdvice
public class UserExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(NoSuchUserException.class)
	public ApiResponse<Void> handleNoSuchUserException(NoSuchUserException exception) {
		return ApiResponse.of(HttpStatus.BAD_REQUEST, exception.getMessage(), null);
	}

}
