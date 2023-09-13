package com.codesquad.secondhand.application.service.in.exception;

import java.util.Map;

public class ImageNotFoundException extends BusinessException {

    private static final String STATUS = "404";
    private static final String ERROR = "이미지를 찾을 수 없습니다.";

    public ImageNotFoundException() {
        super(new ErrorResponse(STATUS, new Errors(Map.of("error", ERROR))));
    }
}
