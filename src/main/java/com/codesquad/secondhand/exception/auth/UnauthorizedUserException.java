package com.codesquad.secondhand.exception.auth;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class UnauthorizedUserException extends CustomException {

	public UnauthorizedUserException() {
		super(ErrorResponse.UNAUTHORIZED_USER_EXCEPTION);
	}

}
