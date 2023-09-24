package com.codesquad.secondhand.exception.auth;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class ExpiredTokenException extends CustomException {

	public ExpiredTokenException() {
		super(ErrorResponse.EXPIRED_TOKEN_EXCEPTION);
	}

}
