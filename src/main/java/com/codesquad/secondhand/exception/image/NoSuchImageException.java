package com.codesquad.secondhand.exception.image;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class NoSuchImageException extends CustomException {

	public NoSuchImageException() {
		super(ErrorResponse.NO_SUCH_IMAGE_EXCEPTION);
	}
}
