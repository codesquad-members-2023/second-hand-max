package com.codesquad.secondhand.exception.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.codesquad.secondhand.api.ApiResponse;

@RestControllerAdvice
public class AuthExceptionHandler {

	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ExceptionHandler(SignInFailedException.class)
	public ApiResponse<Void> handleSignInFailedException(SignInFailedException exception) {
		return ApiResponse.noData(HttpStatus.UNAUTHORIZED, exception.getMessage());
	}

}
