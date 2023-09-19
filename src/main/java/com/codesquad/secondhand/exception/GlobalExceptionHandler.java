package com.codesquad.secondhand.exception;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.exception.auth.ExpiredTokenException;
import com.codesquad.secondhand.exception.auth.PermissionDeniedException;
import com.codesquad.secondhand.exception.auth.SignInFailedException;
import com.codesquad.secondhand.exception.auth.UnauthorizedUserException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ApiResponse<Void> handleMethodValidException(MethodArgumentNotValidException exception) {
		LOGGER.error("MethodArgumentNotValidException : ", exception);
		String message = exception.getBindingResult()
			.getFieldErrors()
			.stream()
			.map(FieldError::getDefaultMessage)
			.collect(Collectors.joining(". "));

		return ApiResponse.noData(HttpStatus.BAD_REQUEST, message);
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(CustomException.class)
	public ApiResponse<Void> handleCustomException(CustomException exception) {
		LOGGER.error("CustomException : ", exception);
		return ApiResponse.noData(exception.getHttpStatus(), exception.getMessage());
	}

	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ExceptionHandler({SignInFailedException.class, UnauthorizedUserException.class, PermissionDeniedException.class})
	public ApiResponse<Void> handleUnauthorizedException(CustomException exception) {
		LOGGER.error("UnauthorizedException : ", exception);
		return ApiResponse.noData(exception.getHttpStatus(), exception.getMessage());
	}

	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ExceptionHandler(ExpiredTokenException.class)
	public ApiResponse<Void> handleForbiddenException(CustomException exception) {
		LOGGER.error("ForbiddenException : ", exception);
		return ApiResponse.noData(exception.getHttpStatus(), exception.getMessage());
	}

}
