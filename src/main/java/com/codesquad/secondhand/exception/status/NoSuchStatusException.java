package com.codesquad.secondhand.exception.status;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class NoSuchStatusException extends CustomException {

	public NoSuchStatusException() {
		super(ErrorResponse.NO_SUCH_STATUS_EXCEPTION);
	}
}
