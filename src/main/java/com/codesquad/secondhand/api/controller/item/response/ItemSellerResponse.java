package com.codesquad.secondhand.api.controller.item.response;

import com.codesquad.secondhand.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ItemSellerResponse {

	private Long id;
	private String nickName;

	public static ItemSellerResponse from(User user) {
		return new ItemSellerResponse(user.getId(), user.getNickname());
	}

}
