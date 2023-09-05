package com.codesquad.secondhand.api.controller.auth.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class OAuthUserResponse {

	private Long id;
	private String name;
	private String email;
	private String profile;

}
