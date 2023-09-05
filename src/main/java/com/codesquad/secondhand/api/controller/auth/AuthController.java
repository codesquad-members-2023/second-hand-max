package com.codesquad.secondhand.api.controller.auth;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.codesquad.secondhand.annotation.SignIn;
import com.codesquad.secondhand.annotation.SignInUser;
import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.controller.auth.request.OAuthAccessTokenRequest;
import com.codesquad.secondhand.api.controller.auth.request.SignInRequest;
import com.codesquad.secondhand.api.controller.auth.response.OAuthAccessTokenResponse;
import com.codesquad.secondhand.api.controller.auth.response.OAuthUserResponse;
import com.codesquad.secondhand.api.service.auth.AuthService;
import com.codesquad.secondhand.api.service.auth.response.ReissueResponse;
import com.codesquad.secondhand.api.service.auth.response.SignInResponse;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

	private static final String ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
	private static final String USER_INFORMATION_URL = "https://api.github.com/user";

	@Value("${security.oauth.kakao.client-id}")
	private String clientId;

	@Value("${security.oauth.kakao.client-secret}")
	private String clientSecret;

	private final AuthService authService;
	private final RestTemplate restTemplate = new RestTemplate();

	@PostMapping
	public ApiResponse<SignInResponse> signIn(@RequestBody SignInRequest request) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.USER_SIGN_IN_SUCCESS.getMessage(),
			authService.signIn(request));
	}

	@DeleteMapping
	public ApiResponse<Void> signOut(@SignIn SignInUser signInUser) {
		authService.signOut(signInUser);
		return ApiResponse.noData(HttpStatus.OK, ResponseMessage.USER_SIGN_OUT_SUCCESS.getMessage());
	}

	@PostMapping("/refresh")
	public ApiResponse<ReissueResponse> refreshAccessToken(@RequestHeader("Authorization") String refreshToken) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.USER_SIGN_OUT_SUCCESS.getMessage(),
			authService.reissue(refreshToken));
	}

	private String requestAccessToken(String code) {
		return Objects.requireNonNull(restTemplate
				.postForObject
					(
						ACCESS_TOKEN_URL,
						new OAuthAccessTokenRequest(clientId, clientSecret, code),
						OAuthAccessTokenResponse.class
					))
			.getAccessToken();
	}

	private OAuthUserResponse requestUserInformation(String accessToken) {
		HttpHeaders headers = new HttpHeaders();
		headers.setBearerAuth(accessToken);
		HttpEntity<Void> request = new HttpEntity<>(headers);

		return Objects.requireNonNull(restTemplate.exchange
				(
					USER_INFORMATION_URL,
					HttpMethod.GET,
					request,
					OAuthUserResponse.class
				)
			.getBody());
	}

}
