package com.codesquad.secondhand.api.controller.user.response;

import com.codesquad.secondhand.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserInformationResponse {

	private Long userId;
	private String nickname;
	private String imageUrl;

	public static UserInformationResponse of(User user) {
		return new UserInformationResponse(user.getId(), user.getNickname(),
			user.getProfileUrl());
	}

}
