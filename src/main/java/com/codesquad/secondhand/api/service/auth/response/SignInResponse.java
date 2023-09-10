package com.codesquad.secondhand.api.service.auth.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SignInResponse {

	private String accessToken;
	private String refreshToken;

}
