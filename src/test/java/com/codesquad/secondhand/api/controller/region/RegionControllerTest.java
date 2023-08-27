package com.codesquad.secondhand.api.controller.region;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import com.codesquad.secondhand.ControllerTestSupport;
import com.codesquad.secondhand.api.ResponseMessage;

class RegionControllerTest extends ControllerTestSupport {

	@DisplayName("cursor를 query parameter로 받아서 조회에 성공하면 200을 응답한다.")
	@Test
	void listAllRegions() throws Exception {
		// given
		String cursor = "0";

		// when // then
		mockMvc.perform(get("/api/regions")
				.param("cursor", cursor))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
			.andExpect(jsonPath("$.status").value(HttpStatus.OK.getReasonPhrase()))
			.andExpect(jsonPath("$.message").value(ResponseMessage.REGION_FETCH_SUCCESS.getMessage()));
	}

}
