package com.codesquad.secondhand.exception.item;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class NoSuchItemException extends CustomException {

	public NoSuchItemException() {
		super(ErrorResponse.NO_SUCH_ITEM_EXCEPTION);
	}
}
