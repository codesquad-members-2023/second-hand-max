package com.codesquad.secondhand.api.service.user;

import static org.assertj.core.api.Assertions.*;

import java.util.Collection;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.api.service.user.request.UserCreateServiceRequest;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.exception.user.DuplicatedEmailException;
import com.codesquad.secondhand.exception.user.DuplicatedNicknameException;

class UserServiceTest extends IntegrationTestSupport {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RegionRepository regionRepository;

	@DisplayName("사용자 등록 시나리오")
	@TestFactory
	Collection<DynamicTest> createLocalUser() {
		// given
		Region region = regionRepository.save(new Region(null, "default"));

		return List.of(
			DynamicTest.dynamicTest("사용자 등록에 성공한다.", () -> {
				// given
				UserCreateServiceRequest request = new UserCreateServiceRequest(
					"mine", "mine@email.com", "password123!",
					null, Provider.ofLocal(), region);

				// when
				userService.createUser(request);

				// then
				assertThat(userRepository.findAll()).hasSize(1);
			}),
			DynamicTest.dynamicTest("이미 사용 중인 이메일로 등록을 시도하는 경우 예외가 발생한다.", () -> {
				// given
				UserCreateServiceRequest request = new UserCreateServiceRequest(
					"your", "mine@email.com", "password123!",
					null, Provider.ofLocal(), region);

				// when // then
				assertThatThrownBy(() -> userService.createUser(request))
					.isInstanceOf(DuplicatedEmailException.class)
					.hasMessage("이미 존재하는 이메일입니다");
			}),
			DynamicTest.dynamicTest("이미 사용 중인 닉네임으로 등록을 시도하는 경우 예외가 발생한다.", () -> {
				// given
				UserCreateServiceRequest request = new UserCreateServiceRequest(
					"mine", "your@email.com", "password123!",
					null, Provider.ofLocal(), region);

				// when // then
				assertThatThrownBy(() -> userService.createUser(request))
					.isInstanceOf(DuplicatedNicknameException.class)
					.hasMessage("이미 존재하는 닉네임입니다");
			}),
			DynamicTest.dynamicTest("닉네임과 이메일이 중복되지 않는 새로운 사용자 등록에 성공한다.", () -> {
				// given
				UserCreateServiceRequest request = new UserCreateServiceRequest(
					"your", "your@email.com", "password123!",
					null, Provider.ofLocal(), region);

				// when
				userService.createUser(request);

				// then
				assertThat(userRepository.findAll()).hasSize(2);
			}),
			DynamicTest.dynamicTest("Provider가 다르고 이메일이 중복된 새로운 사용자 등록에 성공한다.", () -> {
				// given
				UserCreateServiceRequest request =
					UserCreateServiceRequest.from("your@email.com", Provider.ofKakao(), region);

				// when
				userService.createUser(request);

				// then
				assertThat(userRepository.findAll()).hasSize(3);
			})
		);
	}

}
