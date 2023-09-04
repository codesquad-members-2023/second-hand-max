package com.codesquad.secondhand.exception.image;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;

@RestControllerAdvice
public class ImageExceptionHandler {

	private static final Logger logger = LoggerFactory.getLogger(ImageExceptionHandler.class);

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public ApiResponse<Object> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e) {
		logger.debug("MaxUploadSizeExceededException handling : {}", e.getMessage());
		return ApiResponse.noData(
			HttpStatus.BAD_REQUEST,
			ResponseMessage.MAXIMUM_UPLOAD_SIZE_EXCEEDED.getMessage()
		);
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(EmptyFileException.class)
	public ApiResponse<Object> handleEmptyFileException(EmptyFileException e) {
		logger.debug("EmptyFileException handling : {}", e.getMessage());
		return ApiResponse.noData(
			HttpStatus.BAD_REQUEST,
			e.getMessage()
		);
	}

	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(FailedUploadException.class)
	public ApiResponse<Object> handleFailedUploadException(FailedUploadException e) {
		logger.debug("FailedUploadException handling : {}", e.getMessage());
		return ApiResponse.noData(
			HttpStatus.INTERNAL_SERVER_ERROR,
			e.getMessage()
		);
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(InvalidExtensionException.class)
	public ApiResponse<Object> handleInvalidExtensionException(InvalidExtensionException e) {
		logger.debug("InvalidExtensionException handling : {}", e.getMessage());
		return ApiResponse.noData(
			HttpStatus.BAD_REQUEST,
			e.getMessage()
		);
	}

}

