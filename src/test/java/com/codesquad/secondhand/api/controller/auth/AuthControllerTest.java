package com.codesquad.secondhand.api.controller.auth;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.codesquad.secondhand.ControllerTestSupport;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.controller.auth.request.SignInRequest;

class AuthControllerTest extends ControllerTestSupport {

	@DisplayName("email과 password를 받아 로그인 요청을 성공하면 200 OK를 응답합니다.")
	@Test
	void signIn() throws Exception {
		// when // then
		mockMvc.perform(post("/api/auth")
				.content(objectMapper.writeValueAsString(new SignInRequest("email@email.com", "password123!")))
				.contentType(MediaType.APPLICATION_JSON))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
			.andExpect(jsonPath("$.status").value(HttpStatus.OK.getReasonPhrase()))
			.andExpect(jsonPath("$.message").value(ResponseMessage.USER_SIGN_IN_SUCCESS.getMessage()));
	}

	@DisplayName("Resolver를 통해 전달받은 SignInUser에 대한 로그아웃 요청을 성공하면 200 OK를 응답합니다.")
	@Test
	void signOut() throws Exception {
		// given
		mockingJwtService();

		// when // then
		mockMvc.perform(delete("/api/auth"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
			.andExpect(jsonPath("$.status").value(HttpStatus.OK.getReasonPhrase()))
			.andExpect(jsonPath("$.message").value(ResponseMessage.USER_SIGN_OUT_SUCCESS.getMessage()));
	}

	@DisplayName("Authorization Header에서 refresh token을 받아 access token 재발급에 성공하면 200 OK를 응답합니다.")
	@Test
	void refreshAccessToken() throws Exception {
		// given
		mockingJwtService();

		// when // then
		mockMvc.perform(post("/api/auth/refresh")
				.header("Authorization", "refreshToken"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
			.andExpect(jsonPath("$.status").value(HttpStatus.OK.getReasonPhrase()))
			.andExpect(jsonPath("$.message").value(ResponseMessage.USER_SIGN_OUT_SUCCESS.getMessage()));
	}

	@DisplayName("code를 받아 로그인 요청에 성공하면 200 OK를 응답합니다.")
	@Test
	void signByKakao() throws Exception {
		// when // then
		mockMvc.perform(get("/api/auth/oauth/kakao")
				.param("code", "randomCode"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
			.andExpect(jsonPath("$.status").value(HttpStatus.OK.getReasonPhrase()))
			.andExpect(jsonPath("$.message").value(ResponseMessage.USER_SIGN_IN_SUCCESS.getMessage()));
	}

}
