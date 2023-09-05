package com.codesquad.secondhand.api.service.auth;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.annotation.SignInUser;
import com.codesquad.secondhand.api.controller.auth.request.SignInRequest;
import com.codesquad.secondhand.api.service.auth.jwt.JwtService;
import com.codesquad.secondhand.api.service.auth.response.ReissueResponse;
import com.codesquad.secondhand.api.service.auth.response.SignInResponse;
import com.codesquad.secondhand.domain.auth.RefreshRepository;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.exception.auth.InvalidTokenException;
import com.codesquad.secondhand.exception.auth.SignInFailedException;
import com.codesquad.secondhand.exception.user.NoSuchUserException;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthService {

	private final UserRepository userRepository;
	private final RefreshRepository refreshRepository;
	private final JwtService jwtService;

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

		if (!refreshRepository.existsByUserIdAndToken(user.getId(), jwtService.extract(refreshToken))) {
			throw new InvalidTokenException();
		}

		return new ReissueResponse(jwtService.reissueAccessToken(user));
	}

}
