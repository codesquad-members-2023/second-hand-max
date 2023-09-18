package com.codesquad.secondhand.exception.user;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class NoSuchUserException extends CustomException {

	public NoSuchUserException() {
		super(ErrorResponse.NO_SUCH_USER_EXCEPTION);
	}

}
