package com.codesquad.secondhand.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CustomException extends RuntimeException {

    private final HttpStatus httpStatus;
    private final String message;

    public CustomException(ErrorResponse errorResponse) {
        this.httpStatus = errorResponse.getHttpStatus();
        this.message = errorResponse.getMessage();
    }
}
