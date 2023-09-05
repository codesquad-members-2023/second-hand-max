package com.codesquad.secondhand.api.controller.auth.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OAuthAccessTokenResponse {

	@JsonProperty("access_token")
	private String accessToken;

	public OAuthAccessTokenResponse() {
	}

	public OAuthAccessTokenResponse(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getAccessToken() {
		return accessToken;
	}

}
