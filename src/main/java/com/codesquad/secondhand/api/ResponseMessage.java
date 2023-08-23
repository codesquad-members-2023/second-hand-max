package com.codesquad.secondhand.api;

import lombok.Getter;

@Getter
public enum ResponseMessage {

	CATEGORY_FETCH_SUCCESS("카테고리 목록 조회를 성공하였습니다."),
	REGION_FETCH_SUCCESS("모든 동네 목록 조회에 성공하였습니다.");

	private final String message;

	ResponseMessage(String message) {
		this.message = message;
	}

}
