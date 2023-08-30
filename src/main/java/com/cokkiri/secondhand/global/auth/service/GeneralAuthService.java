package com.cokkiri.secondhand.global.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cokkiri.secondhand.global.auth.dto.request.GeneralSignUpRequest;
import com.cokkiri.secondhand.global.exception.NicknameDuplicationException;
import com.cokkiri.secondhand.global.exception.UsernameDuplicationException;
import com.cokkiri.secondhand.user.entity.GeneralUser;
import com.cokkiri.secondhand.user.entity.Role;
import com.cokkiri.secondhand.user.repository.GeneralUserRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class GeneralAuthService {

	private final GeneralUserRepository generalUserRepository;
	private final PasswordEncoder passwordEncoder;

	public void signUp(GeneralSignUpRequest signUpRequest) {

		String username = signUpRequest.getUsername();
		String nickname = signUpRequest.getNickname();

		if(isDuplicateUsername(username)) {
			throw new UsernameDuplicationException(username);
		}

		if(isDuplicateNickname(nickname)) {
			throw new NicknameDuplicationException(nickname);
		}

		GeneralUser user = GeneralUser.builder()
			.username(username)
			.password(signUpRequest.getPassword())
			.nickname(nickname)
			.role(Role.USER)
			.build();

		user.encodePassword(passwordEncoder);
		generalUserRepository.save(user);
	}

	public boolean isDuplicateUsername(String username) {
		return generalUserRepository.findByUsername(username).isPresent();
	}

	public boolean isDuplicateNickname(String nickname) {
		return generalUserRepository.findByNickname(nickname).isPresent();
	}
}
