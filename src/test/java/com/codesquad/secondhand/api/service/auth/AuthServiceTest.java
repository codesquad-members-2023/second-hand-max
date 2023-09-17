package com.codesquad.secondhand.api.service.auth;

import static org.assertj.core.api.Assertions.*;

import java.util.Collection;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.annotation.SignInUser;
import com.codesquad.secondhand.api.controller.auth.request.SignInRequest;
import com.codesquad.secondhand.api.service.auth.response.SignInResponse;
import com.codesquad.secondhand.api.service.user.UserService;
import com.codesquad.secondhand.api.service.user.request.UserCreateServiceRequest;
import com.codesquad.secondhand.domain.auth.RedisAuthRepository;
import com.codesquad.secondhand.domain.auth.RefreshToken;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.domain.user.User;

class AuthServiceTest extends IntegrationTestSupport {

	@Autowired
	private AuthService authService;

	@Autowired
	private UserService userService;

	@Autowired
	private RegionRepository regionRepository;

	@Autowired
	private RedisAuthRepository redisAuthRepository;

	// todo : 오류 수정
	@DisplayName("사용자 로그인 로그아웃 시나리오")
	@TestFactory
	Collection<DynamicTest> signInAndOut() {
		// given
		Region defaultRegion = regionRepository.save(Region.ofDefault());
		UserCreateServiceRequest request = new UserCreateServiceRequest("nickname", "test@email.com", "password123!",
			null, Provider.ofLocal(), defaultRegion);
		User user = userService.createUser(request);

		return List.of(
			DynamicTest.dynamicTest("사용자가 로그인에 성공한다.", () -> {
				// given
				SignInRequest signInRequest = new SignInRequest("test@email.com", "password123!");

				// when
				SignInResponse response = authService.signIn(signInRequest);
				RefreshToken refreshToken = redisAuthRepository.findByUserId(user.getId()).orElseThrow();

				// then
				assertThat(response.getRefreshToken()).isEqualTo(refreshToken.getRefreshToken());
			}),
			DynamicTest.dynamicTest("로그인한 사용자가 로그아웃에 성공한다.", () -> {
				// when
				authService.signOut(new SignInUser(user.getId()));

				// then
				assertThat(redisAuthRepository.findByUserId(user.getId())).isEmpty();
			})
		);
	}

}
