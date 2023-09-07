package com.codesquad.secondhand.api.controller.auth.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class SignInRequest {

	private String email;
	private String password;

}
