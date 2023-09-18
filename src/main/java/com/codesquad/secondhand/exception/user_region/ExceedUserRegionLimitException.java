package com.codesquad.secondhand.exception.user_region;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class ExceedUserRegionLimitException extends CustomException {

	public ExceedUserRegionLimitException() {
		super(ErrorResponse.EXCEED_USER_REGION_LIMIT_EXCEPTION);
	}

}
