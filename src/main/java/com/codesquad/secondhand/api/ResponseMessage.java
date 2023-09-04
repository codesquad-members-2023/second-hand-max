package com.codesquad.secondhand.api;

import lombok.Getter;

@Getter
public enum ResponseMessage {

	CATEGORY_FETCH_SUCCESS("카테고리 목록 조회를 성공하였습니다."),
	REGION_FETCH_SUCCESS("동네 목록 조회를 성공하였습니다."),
	USER_REGION_FETCH_SUCCESS("나의 동네 조회를 성공하였습니다."),
	USER_REGION_CREATE_SUCCESS("나의 동네 등록을 성공하였습니다."),
	USER_REGION_DELETE_SUCCESS("나의 동네 삭제를 성공하였습니다."),
	ITEM_FETCH_SUCCESS("상품 목록 조회를 성공하였습니다."),
	USER_CREATE_SUCCESS("회원가입을 성공하였습니다."),
	USER_SIGN_IN_SUCCESS("로그인을 성공하였습니다."),
	MAXIMUM_UPLOAD_SIZE_EXCEEDED("업로드 가능한 파일의 최대 크기를 초과했습니다.");

	private final String message;

	ResponseMessage(String message) {
		this.message = message;
	}

}
