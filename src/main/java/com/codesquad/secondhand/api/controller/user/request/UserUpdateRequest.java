package com.codesquad.secondhand.api.controller.user.request;

import javax.validation.constraints.Pattern;

import com.codesquad.secondhand.api.service.user.request.UserUpdateServiceRequest;
import com.codesquad.secondhand.domain.image.Image;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserUpdateRequest {

	@Pattern(regexp = "^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9]{2,10}$", message = "닉네임은 2자 이상 10자 이하, 영문 또는 한글을 포함해야 합니다")
	private String nickname;
	private boolean isImageChanged;

	public UserUpdateServiceRequest toService(Image image) {
		return new UserUpdateServiceRequest(this.nickname, this.isImageChanged, image);
	}

}
