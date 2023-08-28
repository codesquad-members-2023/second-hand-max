package com.codesquad.secondhand.exception.region;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.codesquad.secondhand.api.ApiResponse;

@RestControllerAdvice
public class RegionExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(NoSuchRegionException.class)
	public ApiResponse<Void> handleNoSuchRegionException(NoSuchRegionException exception) {
		return ApiResponse.of(HttpStatus.BAD_REQUEST, exception.getMessage(), null);
	}

}
