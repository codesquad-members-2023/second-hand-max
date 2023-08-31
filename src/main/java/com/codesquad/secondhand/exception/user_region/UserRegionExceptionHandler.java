package com.codesquad.secondhand.exception.user_region;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.codesquad.secondhand.api.ApiResponse;

@RestControllerAdvice
public class UserRegionExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler({ExceedUserRegionLimitException.class, MinimumUserRegionViolationException.class,
		DuplicatedUserRegionException.class, NoSuchUserRegionException.class})
	public ApiResponse<Void> handleUserRegionException(RuntimeException exception) {
		return ApiResponse.noData(HttpStatus.BAD_REQUEST, exception.getMessage());
	}

}
