package com.codesquad.secondhand.api.controller.user.request;

import com.codesquad.secondhand.api.service.user.request.UserCreateServiceRequest;
import com.codesquad.secondhand.domain.image.Image;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserCreateRequest {

	private String nickname;
	private String email;
	private String password;

	public UserCreateServiceRequest toService(Image image) {
		return new UserCreateServiceRequest(this.nickname, this.email, this.password, image);
	}

}
