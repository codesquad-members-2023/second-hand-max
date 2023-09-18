package com.codesquad.secondhand.exception.image;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class EmptyFileException extends CustomException {

	public EmptyFileException() {
		super(ErrorResponse.EMPTY_FILE_EXCEPTION);
	}

}
