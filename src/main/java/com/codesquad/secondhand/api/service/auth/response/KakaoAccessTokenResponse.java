package com.codesquad.secondhand.api.service.auth.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class KakaoAccessTokenResponse {

	@JsonProperty("access_token")
	private String accessToken;

	@JsonProperty("token_type")
	private String tokenType;

	@JsonProperty("refresh_token")
	private String refreshToken;

	@JsonProperty("expires_in")
	private String expiresIn;

	@JsonProperty("refresh_token_expires_in")
	private String refreshTokenExpiresIn;

	@JsonProperty("scope")
	private String scope;

	public KakaoAccessTokenResponse(String accessToken) {
		this.accessToken = accessToken;
	}

}
