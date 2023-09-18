package com.codesquad.secondhand.exception.item_image;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class NoSuchItemImageException extends CustomException {

	public NoSuchItemImageException() {
		super(ErrorResponse.NO_SUCH_ITEM_IMAGE_EXCEPTION);
	}
}
