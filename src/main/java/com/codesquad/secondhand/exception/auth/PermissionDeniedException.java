package com.codesquad.secondhand.exception.auth;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class PermissionDeniedException extends CustomException {

	public PermissionDeniedException() {
		super(ErrorResponse.PERMISSION_DENIED_EXCEPTION);
	}
}
