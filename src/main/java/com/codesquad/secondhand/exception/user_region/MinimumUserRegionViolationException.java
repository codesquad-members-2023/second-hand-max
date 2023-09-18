package com.codesquad.secondhand.exception.user_region;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class MinimumUserRegionViolationException extends CustomException {

	public MinimumUserRegionViolationException() {
		super(ErrorResponse.MINIMUM_USER_REGION_VIOLATION_EXCEPTION);
	}

}
