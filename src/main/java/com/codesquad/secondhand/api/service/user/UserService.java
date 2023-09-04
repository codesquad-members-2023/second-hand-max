package com.codesquad.secondhand.api.service.user;

import static com.codesquad.secondhand.domain.provider.Provider.*;
import static com.codesquad.secondhand.domain.region.Region.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.service.user.request.UserCreateServiceRequest;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.user.MyRegion;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;

	@Transactional
	public void createLocalUser(UserCreateServiceRequest request) {
		Provider localProvider = new Provider(LOCAL_PROVIDER_ID, LOCAL_PROVIDER_TYPE);
		Region defaultRegion = new Region(DEFAULT_REGION_ID, DEFAULT_REGION_TITLE);
		// TODO: 중복된 닉네임 검증 및 등록된 이메일 검증
		// if (userRepository.existsByNickname(request.getNickname())) {
		// 	throw new 이미 사용 중인 닉네임입니다.;
		// }
		// if (userRepository.existsByProviderAndEmail(localProvider, request.getEmail())) {
		// 	throw new 이미 가입된 이메일입니다.;
		// }
		User user = new User(
			null,
			new MyRegion(),
			request.getImage(),
			localProvider,
			null,
			request.getNickname(),
			request.getEmail(),
			request.getPassword());
		user.addUserRegion(defaultRegion);
		userRepository.save(user);
	}

}
