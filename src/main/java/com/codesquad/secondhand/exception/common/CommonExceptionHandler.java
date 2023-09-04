package com.codesquad.secondhand.exception.common;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.codesquad.secondhand.api.ApiResponse;

@RestControllerAdvice
public class CommonExceptionHandler {

	private static final Logger logger = LoggerFactory.getLogger(CommonExceptionHandler.class);

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(BindException.class)
	public ApiResponse<Object> handleBindException(BindException e) {
		logger.debug("BindException handling : {}", e.toString());
		return ApiResponse.of(
			HttpStatus.BAD_REQUEST,
			HttpStatus.BAD_REQUEST.getReasonPhrase(),
			e.getBindingResult().getFieldErrors().stream().map(
				error -> {
					Map<String, String> errors = new HashMap<>();
					errors.put("field", error.getField());
					errors.put("defaultMessage", error.getDefaultMessage());
					return errors;
				})
		);
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(InvalidCursorException.class)
	public ApiResponse<Void> handleUserRegionException(InvalidCursorException exception) {
		return ApiResponse.noData(HttpStatus.BAD_REQUEST, exception.getMessage());
	}

}
