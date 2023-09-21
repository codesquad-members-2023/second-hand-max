package com.codesquad.secondhand.exception.category;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class InvalidCategoryException extends CustomException {

	public InvalidCategoryException() {
		super(ErrorResponse.INVALID_CATEGORY_EXCEPTION);
	}

}
