package com.codesquad.secondhand.api.controller.auth.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public class OAuthAccessTokenResponse {

	@JsonProperty("access_token")
	private String accessToken;

	public OAuthAccessTokenResponse() {
	}

	public OAuthAccessTokenResponse(String accessToken) {
		this.accessToken = accessToken;
	}

}
