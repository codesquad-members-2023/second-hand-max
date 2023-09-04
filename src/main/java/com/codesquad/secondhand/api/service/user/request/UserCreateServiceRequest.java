package com.codesquad.secondhand.api.service.user.request;

import com.codesquad.secondhand.domain.image.Image;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserCreateServiceRequest {

	private String nickname;
	private String email;
	private String password;
	private Image image;

}
