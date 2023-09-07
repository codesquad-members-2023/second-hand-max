package com.codesquad.secondhand.api.controller.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.annotation.SignIn;
import com.codesquad.secondhand.annotation.SignInUser;
import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.controller.auth.request.SignInRequest;
import com.codesquad.secondhand.api.service.auth.AuthService;
import com.codesquad.secondhand.api.service.auth.response.ReissueResponse;
import com.codesquad.secondhand.api.service.auth.response.SignInResponse;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

	private static final String AUTHORIZATION_HEADER = "Authorization";

	private final AuthService authService;

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
	public ApiResponse<ReissueResponse> refreshAccessToken(@RequestHeader(AUTHORIZATION_HEADER) String refreshToken) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.USER_SIGN_OUT_SUCCESS.getMessage(),
			authService.reissue(refreshToken));
	}

	@GetMapping("/oauth/kakao")
	public ApiResponse<SignInResponse> signByKakao(@RequestParam String code) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.USER_SIGN_IN_SUCCESS.getMessage(),
			authService.signByKakao(code));
	}

}
