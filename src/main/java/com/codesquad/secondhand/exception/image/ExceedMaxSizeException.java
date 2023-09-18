package com.codesquad.secondhand.exception.image;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class ExceedMaxSizeException extends CustomException {

	public ExceedMaxSizeException() {
		super(ErrorResponse.EXCEED_MAX_SIZE_EXCEPTION);
	}

}
