package com.codesquad.secondhand.exception.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.codesquad.secondhand.api.ApiResponse;

@RestControllerAdvice
public class AuthExceptionHandler {

	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ExceptionHandler({SignInFailedException.class, UnauthorizedUserException.class, InvalidTokenException.class})
	public ApiResponse<Void> handleUnauthorizedException(RuntimeException exception) {
		return ApiResponse.noData(HttpStatus.UNAUTHORIZED, exception.getMessage());
	}

	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ExceptionHandler(ExpiredTokenException.class)
	public ApiResponse<Void> handleExpiredTokenException(ExpiredTokenException exception) {
		return ApiResponse.noData(HttpStatus.FORBIDDEN, exception.getMessage());
	}

	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ExceptionHandler(PermissionDeniedException.class)
	public ApiResponse<Void> handlePermissionDeniedException(PermissionDeniedException exception) {
		return ApiResponse.noData(HttpStatus.UNAUTHORIZED, exception.getMessage());
	}

}
