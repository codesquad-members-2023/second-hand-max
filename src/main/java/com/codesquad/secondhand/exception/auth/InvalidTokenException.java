package com.codesquad.secondhand.exception.auth;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class InvalidTokenException extends CustomException {

	public InvalidTokenException() {
		super(ErrorResponse.INVALID_TOKEN_EXCEPTION);
	}

}
