package com.codesquad.secondhand.exception.category;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class NoSuchCategoryException extends CustomException {

	public NoSuchCategoryException() {
		super(ErrorResponse.NO_SUCH_CATEGORY_EXCEPTION);
	}

}
