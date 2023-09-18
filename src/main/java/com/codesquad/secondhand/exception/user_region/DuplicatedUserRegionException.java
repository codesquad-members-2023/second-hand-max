package com.codesquad.secondhand.exception.user_region;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class DuplicatedUserRegionException extends CustomException {

	public DuplicatedUserRegionException() {
		super(ErrorResponse.DUPLICATED_USER_REGION_EXCEPTION);
	}

}
