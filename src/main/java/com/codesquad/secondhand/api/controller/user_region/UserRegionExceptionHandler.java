package com.codesquad.secondhand.api.controller.user_region;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.service.user_region.exception.ExceedUserRegionLimitException;
import com.codesquad.secondhand.api.service.user_region.exception.MinimumUserRegionViolationException;

@RestControllerAdvice
public class UserRegionExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler({ExceedUserRegionLimitException.class, MinimumUserRegionViolationException.class})
	public ApiResponse<Void> handleUserRegionException(RuntimeException exception) {
		return ApiResponse.of(HttpStatus.BAD_REQUEST, exception.getMessage(), null);
	}

}
