package com.codesquad.secondhand.api.service.user.request;

import com.codesquad.secondhand.domain.image.Image;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserUpdateServiceRequest {

	private String newNickname;
	private boolean isImageChanged;
	private Image newImage;

}
