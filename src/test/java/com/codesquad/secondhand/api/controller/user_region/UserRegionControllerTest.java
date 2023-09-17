package com.codesquad.secondhand.api.controller.user_region;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.codesquad.secondhand.ControllerTestSupport;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.controller.user_region.request.UserRegionCreateRequest;

class UserRegionControllerTest extends ControllerTestSupport {

	@DisplayName("사용자 동네 목록 조회에 성공하면 200을 응답한다.")
	@Test
	void listUserRegions() throws Exception {
		// given
		mockingJwtService();

		// when // then
		mockMvc.perform(get("/api/users/regions"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
			.andExpect(jsonPath("$.status").value(HttpStatus.OK.getReasonPhrase()))
			.andExpect(jsonPath("$.message").value(ResponseMessage.USER_REGION_FETCH_SUCCESS.getMessage()));
	}

	@DisplayName("사용자 동네 등록에 성공하면 201을 응답한다.")
	@Test
	void createUserRegion() throws Exception {
		// given
		mockingJwtService();

		UserRegionCreateRequest request = new UserRegionCreateRequest(1L);

		// when // then
		mockMvc.perform(post("/api/users/regions")
				.content(objectMapper.writeValueAsString(request))
				.contentType(MediaType.APPLICATION_JSON))
			.andDo(print())
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.code").value(HttpStatus.CREATED.value()))
			.andExpect(jsonPath("$.status").value(HttpStatus.CREATED.getReasonPhrase()))
			.andExpect(jsonPath("$.message").value(ResponseMessage.USER_REGION_CREATE_SUCCESS.getMessage()));
	}

	@DisplayName("사용자 동네 삭제에 성공하면 200을 응답한다.")
	@Test
	void deleteUserRegion() throws Exception {
		// // given
		mockingJwtService();

		// when // then
		mockMvc.perform(delete("/api/users/regions/1"))
			.andDo(print())
			.andExpect(status().isOk());
	}

}
