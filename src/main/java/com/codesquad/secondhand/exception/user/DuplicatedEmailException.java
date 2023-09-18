package com.codesquad.secondhand.exception.user;

import com.codesquad.secondhand.exception.CustomException;
import com.codesquad.secondhand.exception.ErrorResponse;

public class DuplicatedEmailException extends CustomException {

    public DuplicatedEmailException() {
        super(ErrorResponse.DUPLICATED_EMAIL_EXCEPTION);
    }

}
