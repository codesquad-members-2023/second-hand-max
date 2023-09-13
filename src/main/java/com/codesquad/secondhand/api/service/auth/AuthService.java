package com.codesquad.secondhand.api.service.auth;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.annotation.SignInUser;
import com.codesquad.secondhand.api.controller.auth.request.SignInRequest;
import com.codesquad.secondhand.api.service.auth.jwt.JwtService;
import com.codesquad.secondhand.api.service.auth.oauth.KakaoClient;
import com.codesquad.secondhand.api.service.auth.response.ReissueResponse;
import com.codesquad.secondhand.api.service.auth.response.SignInResponse;
import com.codesquad.secondhand.api.service.user.UserService;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.user.User;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthService {

	private final UserService userService;
	private final JwtService jwtService;
	private final KakaoClient kakaoClient;

	@Transactional
	public SignInResponse signIn(SignInRequest request) {
		return jwtService.issueTokens(userService.findLocalUser(request.getEmail(), request.getPassword()));
	}

	@Transactional
	public void signOut(SignInUser signInUser) {
		jwtService.deleteRefreshToken(signInUser.getId());
	}

	@Transactional
	public ReissueResponse reissue(String refreshToken) {
		Claims claims = jwtService.parse(refreshToken);
		User user = userService.findUser(claims.get("id", Long.class));
		jwtService.validateRefreshToken(user, refreshToken);

		return new ReissueResponse(jwtService.reissueAccessToken(user));
	}

	@Transactional
	public SignInResponse signByKakao(String code) {
		String email = kakaoClient.requestUserInformation(code).getId() + "@fishprincess.site";
		User user = userService.findOrCreateUser(Provider.ofKakao(), email);

		return jwtService.issueTokens(user);
	}

}
