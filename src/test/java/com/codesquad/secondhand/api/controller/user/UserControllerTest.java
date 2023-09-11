package com.codesquad.secondhand.api.controller.user;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;

import com.codesquad.secondhand.ControllerTestSupport;
import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.controller.user.request.UserCreateRequest;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.user.User;
import com.fasterxml.jackson.core.JsonProcessingException;

public class UserControllerTest extends ControllerTestSupport {

	@DisplayName("Local 사용자 등록에 성공하면 201 CREATED를 응답한다.")
	@Test
	void createLocalUser() throws Exception {
		// given
		mockingJwtService();
		mockingUserService();

		UserCreateRequest request = new UserCreateRequest("nickname", "email@email.com", "password123!");

		// when // then
		mockMvc.perform(multipart("/api/users")
				.file(mockingRequestMultipartFile(request)))
			.andDo(print())
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.code").value(HttpStatus.CREATED.value()))
			.andExpect(jsonPath("$.status").value(HttpStatus.CREATED.getReasonPhrase()))
			.andExpect(jsonPath("$.message").value(ResponseMessage.USER_CREATE_SUCCESS.getMessage()));
	}

	@DisplayName("Local 사용자 등록 시 닉네임 형식이 잘못된 경우 400 BAD REQUEST를 응답한다.")
	@ValueSource(strings = {"", " ", "  ", "a", "가", "toooooolong", "12345678"})
	@ParameterizedTest
	void createLocalUserWithInvalidNickname(String nickname) throws Exception {
		// given
		mockingJwtService();
		mockingUserService();

		UserCreateRequest request = new UserCreateRequest(nickname, "email@email.com", "password123!");

		// when // then
		mockMvc.perform(multipart("/api/users")
				.file(mockingRequestMultipartFile(request)))
			.andDo(print())
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.code").value(HttpStatus.BAD_REQUEST.value()))
			.andExpect(jsonPath("$.status").value(HttpStatus.BAD_REQUEST.getReasonPhrase()));
	}

	@DisplayName("Local 사용자 등록 시 이메일 형식이 잘못된 경우 400 BAD REQUEST를 응답한다.")
	@ValueSource(strings = {"", " ", "email", "email@email", "email@email.", "email@email.c", "!@#@email.com"})
	@ParameterizedTest
	void createLocalUserWithInvalidEmail(String email) throws Exception {
		// given
		mockingJwtService();
		mockingUserService();

		UserCreateRequest request = new UserCreateRequest("nickname", email, "password123!");

		// when // then
		mockMvc.perform(multipart("/api/users")
				.file(mockingRequestMultipartFile(request)))
			.andDo(print())
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.code").value(HttpStatus.BAD_REQUEST.value()))
			.andExpect(jsonPath("$.status").value(HttpStatus.BAD_REQUEST.getReasonPhrase()));
	}

	@DisplayName("Local 사용자 등록 시 비밀번호 형식이 잘못된 경우 400 BAD REQUEST를 응답한다.")
	@ValueSource(strings = {"", " ", "  ", "a", "가나다라마바123!", "password123", "password!@#"})
	@ParameterizedTest
	void createLocalUserWithInvalidPassword(String password) throws Exception {
		// given
		mockingJwtService();
		mockingUserService();

		UserCreateRequest request = new UserCreateRequest("nickname", "email@email.com", password);

		// when // then
		mockMvc.perform(multipart("/api/users")
				.file(mockingRequestMultipartFile(request)))
			.andDo(print())
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("$.code").value(HttpStatus.BAD_REQUEST.value()))
			.andExpect(jsonPath("$.status").value(HttpStatus.BAD_REQUEST.getReasonPhrase()));
	}

	private void mockingUserService() {
		User mockUser = FixtureFactory.createUserFixture(List.of(Region.ofDefault()));
		given(userService.createUser(any())).willReturn(mockUser);
	}

	private MockMultipartFile mockingRequestMultipartFile(UserCreateRequest request) throws JsonProcessingException {
		return new MockMultipartFile("request", "", "application/json",
			objectMapper.writeValueAsString(request).getBytes(StandardCharsets.UTF_8));
	}

}
