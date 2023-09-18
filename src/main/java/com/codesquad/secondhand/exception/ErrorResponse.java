package com.codesquad.secondhand.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorResponse {

	// Category
	NO_SUCH_CATEGORY_EXCEPTION(HttpStatus.BAD_REQUEST, "존재하지 않는 카테고리입니다"),

	// Region
	NO_SUCH_REGION_EXCEPTION(HttpStatus.BAD_REQUEST, "존재하지 않는 동네입니다"),

	// Item
	NO_SUCH_ITEM_EXCEPTION(HttpStatus.BAD_REQUEST, "존재하지 않는 상품입니다"),

	// Auth
	EXPIRED_TOKEN_EXCEPTION(HttpStatus.FORBIDDEN, "토큰이 만료되었습니다"),
	INVALID_TOKEN_EXCEPTION(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다"),
	PERMISSION_DENIED_EXCEPTION(HttpStatus.UNAUTHORIZED, "해당 유저는 권한이 없습니다"),
	SIGN_IN_FAILED_EXCEPTION(HttpStatus.UNAUTHORIZED, "이메일이나 비밀번호가 다릅니다"),
	UNAUTHORIZED_USER_EXCEPTION(HttpStatus.UNAUTHORIZED, "인증되지 않은 사용자입니다"),

	// User
	DUPLICATED_EMAIL_EXCEPTION(HttpStatus.BAD_REQUEST, "이미 존재하는 이메일입니다"),
	DUPLICATED_NICKNAME_EXCEPTION(HttpStatus.BAD_REQUEST, "이미 존재하는 닉네임입니다"),
	NO_SUCH_USER_EXCEPTION(HttpStatus.BAD_REQUEST, "존재하지 않는 사용자입니다"),

	// UserRegion
	DUPLICATED_USER_REGION_EXCEPTION(HttpStatus.BAD_REQUEST, "이미 등록된 동네입니다"),
	EXCEED_USER_REGION_LIMIT_EXCEPTION(HttpStatus.BAD_REQUEST, "동네 등록 수가 최대 제한을 초과했습니다. 동네 등록 요청이 거부되었습니다"),
	MINIMUM_USER_REGION_VIOLATION_EXCEPTION(HttpStatus.BAD_REQUEST, "최소 1개의 동네는 필수입니다. 동네 삭제 요청이 거부되었습니다"),
	NO_SUCH_USER_REGION_EXCEPTION(HttpStatus.BAD_REQUEST, "나의 동네에 등록 되지 않았습니다"),

	// Image
	EMPTY_FILE_EXCEPTION(HttpStatus.BAD_REQUEST, "해당 파일은 비어있거나 없습니다"),
	EXCEED_MAX_SIZE_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드 사이즈를 초과하였습니다"),
	INVALID_EXTENSION_EXCEPTION(HttpStatus.BAD_REQUEST, "해당 파일은 이미지 타입이 아닙니다"),
	NO_SUCH_IMAGE_EXCEPTION(HttpStatus.BAD_REQUEST, "해당 이미지가 없습니다"),

	// ItemImage
	NO_SUCH_ITEM_IMAGE_EXCEPTION(HttpStatus.BAD_REQUEST, "존재하지 않는 상품 이미지입니다"),

	// Status
	NO_SUCH_STATUS_EXCEPTION(HttpStatus.BAD_REQUEST, "존재하지 않는 판매 상태입니다"),

	// Wishlist
	DUPLICATED_WISHLIST_EXCEPTION(HttpStatus.BAD_REQUEST, "이미 관심 목록에 등록된 상품입니다"),
	NO_SUCH_WISHLIST_EXCEPTION(HttpStatus.BAD_REQUEST, "해당 상품이 관심 목록에 없습니다"),

	// Provider
	NO_SUCH_PROVIDER_EXCEPTION(HttpStatus.BAD_REQUEST, "존재하지 않는 공급자입니다");

	private final HttpStatus httpStatus;
	private final String message;

	ErrorResponse(HttpStatus httpStatus, String message) {
		this.httpStatus = httpStatus;
		this.message = message;
	}
}
