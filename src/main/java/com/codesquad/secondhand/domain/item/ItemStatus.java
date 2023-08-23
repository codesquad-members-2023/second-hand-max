package com.codesquad.secondhand.domain.item;

public enum ItemStatus {

	ON_SALE("판매중"), RESERVED("예약중"), SOLD_OUT("판매완료");

	private String title;

	ItemStatus(String title) {
		this.title = title;
	}

}
