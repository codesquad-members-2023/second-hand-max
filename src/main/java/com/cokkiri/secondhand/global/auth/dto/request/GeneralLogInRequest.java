package com.cokkiri.secondhand.global.auth.dto.request;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class GeneralLogInRequest {

	@NotBlank(message = "아이디는 필수 값입니다.")
	@Length(max = 100, message = "아이디는 최대 100글자 입니다.")
	private String username;

	@NotBlank(message = "비밀번호는 필수 값입니다.")
	@Length(max = 100, message = "비밀번호는 최대 100글자 입니다.")
	private String password;

	public String getEncodedPassword(PasswordEncoder passwordEncoder) {
		return passwordEncoder.encode(this.password);
	}
}
