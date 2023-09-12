package com.codesquad.secondhand.exception.item_image;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.codesquad.secondhand.api.ApiResponse;

@RestControllerAdvice
public class ItemImageExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(NoSuchItemImageException.class)
	public ApiResponse<Void> handleNoSuchItemImageException(NoSuchItemImageException exception) {
		return ApiResponse.noData(HttpStatus.BAD_REQUEST, exception.getMessage());
	}
}
