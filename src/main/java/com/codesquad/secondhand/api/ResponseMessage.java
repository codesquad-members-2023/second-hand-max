package com.codesquad.secondhand.api;

import lombok.Getter;

@Getter
public enum ResponseMessage {

	// Category
	CATEGORY_FETCH_SUCCESS("카테고리 목록 조회를 성공하였습니다"),

	// Region
	REGION_FETCH_SUCCESS("동네 목록 조회를 성공하였습니다"),

	// Item
	ITEM_FETCH_SUCCESS("상품 목록 조회를 성공하였습니다"),
	ITEM_DETAIL_FETCH_SUCCESS("상품 조회를 성공하였습니다"),
	ITEM_POST_SUCCESS("상품 등록을 성공하였습니다"),
	ITEM_DELETE_SUCCESS("상품 삭제를 성공하였습니다"),
	ITEM_UPDATE_SUCCESS("상품 수정을 성공하였습니다"),

	// User
	USER_REGION_FETCH_SUCCESS("나의 동네 조회를 성공하였습니다"),
	USER_REGION_CREATE_SUCCESS("나의 동네 등록을 성공하였습니다"),
	USER_REGION_SELECT_SUCCESS("나의 동네 선택을 성공하였습니다"),
	USER_REGION_DELETE_SUCCESS("나의 동네 삭제를 성공하였습니다"),
	USER_CREATE_SUCCESS("회원가입을 성공하였습니다"),
	USER_SIGN_IN_SUCCESS("로그인을 성공하였습니다"),
	USER_SIGN_OUT_SUCCESS("로그아웃을 성공하였습니다"),
	USER_INFORMATION_FETCH_SUCCESS("사용자 정보 조회를 성공하였습니다"),
	USER_INFORMATION_UPDATE_SUCCESS("사용자 정보 수정을 성공하였습니다"),

	// Image
	MAXIMUM_UPLOAD_SIZE_EXCEEDED("업로드 가능한 파일의 최대 크기를 초과했습니다"),

	// Wishlist
	WISHLIST_FETCH_SUCCESS("관심목록 조회를 성공하였습니다"),
	WISHLIST_CREATE_SUCCESS("관심목록 추가를 성공하였습니다"),
	WISHLIST_DELETE_SUCCESS("관심목록 삭제를 성공하였습니다");

	private final String message;

	ResponseMessage(String message) {
		this.message = message;
	}

}
