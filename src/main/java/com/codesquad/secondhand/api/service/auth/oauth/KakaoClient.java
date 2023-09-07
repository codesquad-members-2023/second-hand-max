package com.codesquad.secondhand.api.service.auth.oauth;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.codesquad.secondhand.api.service.auth.request.KakaoAccessTokenRequest;
import com.codesquad.secondhand.api.service.auth.response.KakaoAccessTokenResponse;
import com.codesquad.secondhand.api.service.auth.response.OAuthUserResponse;
import com.codesquad.secondhand.util.MultiValueMapConverter;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class KakaoClient {

	private final KakaoProperties kakaoProperties;

	public OAuthUserResponse requestUserInformation(String code) {
		return WebClient.create().post().uri(kakaoProperties.getUserInformationUrl())
			.headers(httpHeaders -> {
				httpHeaders.setBearerAuth(requestAccessToken(code, kakaoProperties.getAccessTokenUrl()));
				httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
				httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
				httpHeaders.setAcceptCharset(List.of(StandardCharsets.UTF_8));
			})
			.retrieve()
			.bodyToMono(OAuthUserResponse.class)
			.block();
	}

	private String requestAccessToken(String code, String url) {
		return Objects.requireNonNull(WebClient.create().post().uri(url)
				.headers(httpHeaders -> {
					httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
					httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
					httpHeaders.setAcceptCharset(List.of(StandardCharsets.UTF_8));
				})
				.bodyValue(
					MultiValueMapConverter.convert(new ObjectMapper(), KakaoAccessTokenRequest.of(kakaoProperties, code)))
				.retrieve()
				.bodyToMono(KakaoAccessTokenResponse.class)
				.block())
			.getAccessToken();
	}

}
