package com.codesquad.secondhand.api.controller.item;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import com.codesquad.secondhand.ControllerTestSupport;
import com.codesquad.secondhand.api.controller.item.request.ItemPostRequest;
import com.codesquad.secondhand.api.controller.item.response.ItemDetailResponse;
import com.codesquad.secondhand.api.controller.item.response.ItemSellerResponse;
import com.codesquad.secondhand.domain.image.Image;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ItemControllerTest extends ControllerTestSupport {

	private static final String HEADER_NAME = "Authorization";
	private static final String HEADER_VALUE = "Bearer test-access-token";

	@DisplayName("새로운 상품을 등록하고 201을 응답한다.")
	@Test
	void postItem() throws Exception {
		// given
		mockingJwtService();
		ItemPostRequest request = new ItemPostRequest("title", null, "content", List.of(1L, 2L), 1L, 1L);

		// when
		ObjectMapper objectMapper = new ObjectMapper();
		when(imageService.findImagesByIds(request.getImageIds())).thenReturn(
			List.of(new Image(1L, "1.jpg"), new Image(2L, "2.jpg")));

		// then
		mockMvc.perform(post("/api/items")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request))
				.header(HEADER_NAME, HEADER_VALUE))
			.andDo(print())
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.message").value("상품 등록을 성공하였습니다"));
	}

	@DisplayName("상품을 상세 조회하고 200을 응답한다.")
	@Test
	void getItemDetail() throws Exception {
		// given
		mockingJwtService();
		Long itemId = 1L;
		ItemSellerResponse sellerResponse = new ItemSellerResponse(1L, "nickname");
		ItemDetailResponse itemResponse = new ItemDetailResponse(1L, "title", "판매중", "content", LocalDateTime.now(),
			null, "가전", sellerResponse, 0, 0, 0L, false, null);

		when(itemService.getItemDetail(anyLong(), anyLong())).thenReturn(itemResponse);

		// when & then
		mockMvc.perform(get("/api/items/" + itemId)
				.header(HEADER_NAME, HEADER_VALUE))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.message").value("상품 조회를 성공하였습니다"))
			.andExpect(jsonPath("$.data.id").value(1L))
			.andExpect(jsonPath("$.data.title").value("title"))
			.andExpect(jsonPath("$.data.content").value("content"))
			.andExpect(jsonPath("$.data.price").doesNotExist())
			.andExpect(jsonPath("$.data.category").value("가전"))
			.andExpect(jsonPath("$.data.seller.id").value(1L))
			.andExpect(jsonPath("$.data.seller.nickName").value("nickname"))
			.andExpect(jsonPath("$.data.numChat").value(0))
			.andExpect(jsonPath("$.data.numLikes").value(0))
			.andExpect(jsonPath("$.data.numViews").value(0L))
			.andExpect(jsonPath("$.data.isLiked").value(false))
			.andExpect(jsonPath("$.data.images").doesNotExist());
	}

}
