package com.codesquad.secondhand.application.port.in.exception;

public class RegionNotFoundException extends BusinessException {

    private static final String STATUS = "404";
    private static final String ERROR = "동네를 찾을 수 없습니다.";

    public RegionNotFoundException() {
        super(new ErrorResponse(STATUS, new ErrorBody(ERROR, null)));
    }
}
