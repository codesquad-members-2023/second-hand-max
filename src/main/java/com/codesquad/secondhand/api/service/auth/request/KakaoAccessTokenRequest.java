package com.codesquad.secondhand.api.service.auth.request;

import com.codesquad.secondhand.api.service.auth.oauth.KakaoProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class KakaoAccessTokenRequest {

	@JsonProperty("grant_type")
	private String grantType;

	@JsonProperty("client_id")
	private String clientId;

	@JsonProperty("client_secret")
	private String clientSecret;

	@JsonProperty("redirect_uri")
	private String redirectUri;

	private String code;

	public static KakaoAccessTokenRequest of(KakaoProperties kakaoProperties, String code) {
		return new KakaoAccessTokenRequest(
			"authorization_code",
			kakaoProperties.getClientId(),
			kakaoProperties.getClientSecret(),
			kakaoProperties.getRedirectUri(),
			code);
	}

}
