package com.codesquad.secondhand.exception.region;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class NoSuchRegionException extends CustomException {

	public NoSuchRegionException() {
		super(ErrorResponse.NO_SUCH_REGION_EXCEPTION);
	}

}
