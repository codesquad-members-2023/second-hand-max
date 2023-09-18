package com.codesquad.secondhand.exception.auth;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class SignInFailedException extends CustomException {

	public SignInFailedException() {
		super(ErrorResponse.SIGN_IN_FAILED_EXCEPTION);
	}

}
