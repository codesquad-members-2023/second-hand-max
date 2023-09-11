package com.codesquad.secondhand.api.service.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.controller.user.response.UserInformationResponse;
import com.codesquad.secondhand.api.service.user.request.UserCreateServiceRequest;
import com.codesquad.secondhand.api.service.user.request.UserUpdateServiceRequest;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.user.MyRegion;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.exception.user.DuplicatedEmailException;
import com.codesquad.secondhand.exception.user.DuplicatedNicknameException;
import com.codesquad.secondhand.exception.user.NoSuchUserException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;

	@Transactional
	public User createUser(UserCreateServiceRequest request) {
		if (userRepository.existsByNickname(request.getNickname())) {
			throw new DuplicatedNicknameException();
		}
		if (userRepository.existsByProviderAndEmail(request.getProvider(), request.getEmail())) {
			throw new DuplicatedEmailException();
		}
		User user = new User(
			null,
			new MyRegion(),
			request.getImage(),
			request.getProvider(),
			null,
			request.getNickname(),
			request.getEmail(),
			request.getPassword());
		user.addUserRegion(request.getRegion());
		return userRepository.save(user);
	}

	@Transactional(readOnly = true)
	public UserInformationResponse showUserInformation(Long userId) {
		User user = userRepository.findById(userId).orElseThrow(NoSuchUserException::new);
		return UserInformationResponse.of(user);
	}

	@Transactional
	public void updateUserInformation(Long userId, UserUpdateServiceRequest request) {
		User user = userRepository.findById(userId).orElseThrow(NoSuchUserException::new);
		Image newImage = request.isImageChanged() ? request.getNewImage() : user.getProfile();
		user.updateInformation(request.getNewNickname(), newImage);
	}

}
