package com.codesquad.secondhand.exception.user;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class DuplicatedNicknameException extends CustomException {

	public DuplicatedNicknameException() {
		super(ErrorResponse.DUPLICATED_NICKNAME_EXCEPTION);
	}

}
