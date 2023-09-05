package com.codesquad.secondhand.api.controller.auth.request;

public class OAuthAccessTokenRequest {

	private String client_id;
	private String client_secret;
	private String code;

	public OAuthAccessTokenRequest() {
	}

	public OAuthAccessTokenRequest(String clientId, String clientSecret, String code) {
		this.client_id = clientId;
		this.client_secret = clientSecret;
		this.code = code;
	}

	public String getClient_id() {
		return client_id;
	}

	public String getClient_secret() {
		return client_secret;
	}

	public String getCode() {
		return code;
	}

}
