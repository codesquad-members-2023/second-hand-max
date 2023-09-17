package com.codesquad.secondhand.api.service.user;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.controller.user.response.UserInformationResponse;
import com.codesquad.secondhand.api.service.item.response.ItemTransactionResponse;
import com.codesquad.secondhand.api.service.item.response.ItemTransactionSliceResponse;
import com.codesquad.secondhand.api.service.user.request.UserCreateServiceRequest;
import com.codesquad.secondhand.api.service.user.request.UserUpdateServiceRequest;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.item.QueryItemRepository;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.exception.auth.SignInFailedException;
import com.codesquad.secondhand.exception.user.DuplicatedEmailException;
import com.codesquad.secondhand.exception.user.DuplicatedNicknameException;
import com.codesquad.secondhand.exception.user.NoSuchUserException;
import com.codesquad.secondhand.util.PasswordEncoder;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final QueryItemRepository queryItemRepository;

	@Transactional
	public User createUser(UserCreateServiceRequest request) {
		if (userRepository.existsByNickname(request.getNickname())) {
			throw new DuplicatedNicknameException();
		}
		if (userRepository.existsByProviderAndEmail(request.getProvider(), request.getEmail())) {
			throw new DuplicatedEmailException();
		}
		request.encodePassword(passwordEncoder.encrypt(request.getPassword()));
		User user = request.toEntity();
		user.addUserRegion(request.getRegion());
		user.updateSelectedRegion(request.getRegion());
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

	@Transactional(readOnly = true)
	public User findUser(Long id) {
		return userRepository.findById(id).orElseThrow(NoSuchUserException::new);
	}

	@Transactional(readOnly = true)
	public User findLocalUser(String email, String password) {
		User user = userRepository.findByProviderIdAndEmail(Provider.ofLocal().getId(), email)
			.orElseThrow(NoSuchUserException::new);
		if (passwordEncoder.isMatch(password, user.getPassword())) {
			return user;
		}
		throw new SignInFailedException();
	}

	@Transactional
	public User findOrCreateUser(Provider provider, String email) {
		return userRepository.findByProviderIdAndEmail(provider.getId(), email)
			.orElseGet(() -> createUser(UserCreateServiceRequest.from(email, Provider.ofKakao(),
				Region.ofDefault())));
	}

	// todo : 존재하지 않는 statusId에 대한 valid 넣을지 말지 결정
	@Transactional(readOnly = true)
	public ItemTransactionSliceResponse findUserTransactionList(Long userId, List<Long> statusIds, Pageable pageable) {
		Slice<Item> responses = queryItemRepository.filteredByUserIdAndStatusIds(userId, statusIds, pageable);

		return new ItemTransactionSliceResponse(responses.hasNext(),
			ItemTransactionResponse.from(responses.getContent()));
	}

}
