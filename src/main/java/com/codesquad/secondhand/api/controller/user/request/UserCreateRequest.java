package com.codesquad.secondhand.api.controller.user.request;

import javax.validation.constraints.Pattern;

import com.codesquad.secondhand.api.service.user.request.UserCreateServiceRequest;
import com.codesquad.secondhand.domain.image.Image;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserCreateRequest {

	@Pattern(regexp = "^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9]{2,10}$", message = "닉네임은 2자 이상 10자 이하, 영문 또는 한글을 포함해야 합니다")
	private String nickname;

	@Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "이메일 형식이 올바르지 않습니다")
	private String email;

	@Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,16}$", message = "비밀번호는 8자 이상 16자 이하로, 영문, 숫자, 특수문자를 최소 1개씩 포함해야 합니다")
	private String password;

	public UserCreateServiceRequest toService(Image image) {
		return new UserCreateServiceRequest(this.nickname, this.email, this.password, image);
	}

}
