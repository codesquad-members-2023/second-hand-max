package com.codesquad.secondhand.exception.user_region;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class NoSuchUserRegionException extends CustomException {

	public NoSuchUserRegionException() {
		super(ErrorResponse.NO_SUCH_USER_REGION_EXCEPTION);
	}

}
