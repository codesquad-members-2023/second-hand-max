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
import com.codesquad.secondhand.api.service.user.request.UserCreateServiceRequest;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.exception.auth.SignInFailedException;
import com.codesquad.secondhand.exception.user.NoSuchUserException;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthService {

	private final UserRepository userRepository;
	private final UserService userService;
	private final JwtService jwtService;
	private final KakaoClient kakaoClient;

	@Transactional
	public SignInResponse signIn(SignInRequest request) {
		User user = userRepository.findByEmailAndPassword(request.getEmail(), request.getPassword())
			.orElseThrow(SignInFailedException::new);

		return jwtService.issueTokens(user);
	}

	@Transactional
	public void signOut(SignInUser signInUser) {
		jwtService.deleteRefreshToken(signInUser);
	}

	@Transactional
	public ReissueResponse reissue(String refreshToken) {
		Claims claims = jwtService.parse(refreshToken);
		User user = userRepository.findById(claims.get("id", Long.class)).orElseThrow(NoSuchUserException::new);
		jwtService.validateRefreshToken(user, refreshToken);

		return new ReissueResponse(jwtService.reissueAccessToken(user));
	}

	@Transactional
	public SignInResponse signByKakao(String code) {
		String email = kakaoClient.requestUserInformation(code).getId() + "@fishprincess.site";
		User user = userRepository.findByProviderIdAndEmail(Provider.ofKakao().getId(), email)
			.orElseGet(() -> userService.createUser(UserCreateServiceRequest.from(email, Provider.ofKakao(),
				Region.ofDefault())));

		return jwtService.issueTokens(user);
	}

}
