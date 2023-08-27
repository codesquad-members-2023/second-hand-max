package com.codesquad.secondhand.api.controller.category;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import com.codesquad.secondhand.ControllerTestSupport;
import com.codesquad.secondhand.api.ResponseMessage;

public class CategoryControllerTest extends ControllerTestSupport {

	@DisplayName("카테고리 목록 조회를 성공하고 200OK를 반환환다")
	@Test
	void listAllCategories() throws Exception {
		//when & then
		mockMvc.perform(get("/api/categories"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
			.andExpect(jsonPath("$.status").value(HttpStatus.OK.getReasonPhrase()))
			.andExpect(jsonPath("$.message").value(ResponseMessage.CATEGORY_FETCH_SUCCESS.getMessage()));
	}

}
