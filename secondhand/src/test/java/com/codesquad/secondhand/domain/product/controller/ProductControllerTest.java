package com.codesquad.secondhand.domain.product.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;

import org.assertj.core.api.Assertions;
import org.json.JSONArray;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.codesquad.secondhand.BaseControllerTest;
import com.codesquad.secondhand.annotation.IntegrationTest;
import com.codesquad.secondhand.domain.product.dto.request.ProductSaveAndUpdateRequest;
import com.codesquad.secondhand.domain.product.dto.request.ProductUpdateRequest;
import com.codesquad.secondhand.domain.product.entity.Image;

@IntegrationTest
class ProductControllerTest extends BaseControllerTest {

	@Test
	@DisplayName("상품등록시 해당 상품의 id를 반환한다.")
	void save() throws Exception {
		//given
		ProductSaveAndUpdateRequest productSaveAndUpdateRequest = new ProductSaveAndUpdateRequest("상품명", 1L, 100000L,
			"상품내용", 1L,
			Arrays.asList(1L, 2L));
		String request = objectMapper.writeValueAsString(productSaveAndUpdateRequest);

		saveDummyImage("imageTest1");
		saveDummyImage("imageTest2");

		//when & then
		mockMvc.perform(MockMvcRequestBuilders.post("/api/products")
				.header(AUTHORIZATION, JWT_TOKEN_PREFIX + jwt.getAccessToken())
				.contentType(MediaType.APPLICATION_JSON)
				.content(request))
			.andExpect(jsonPath("$.id").exists())
			.andExpect(status().isCreated());
	}

	private void saveDummyImage(String image) {
		imageJpaRepository.save(Image.builder().imgUrl(image).build());
	}

	@Test
	@DisplayName("상품 상세 조회시 해당 상품의 정보를 포함하는 응답을 반환한다.")
	void findDetail() throws Exception {
		//given
		ProductSaveAndUpdateRequest productSaveAndUpdateRequest = new ProductSaveAndUpdateRequest("상품명", 1L, 100000L,
			"상품내용", 1L,
			Arrays.asList(1L, 2L));

		saveDummyImage("imageTest1");
		saveDummyImage("imageTest2");

		productService.save(productSaveAndUpdateRequest, MEMBER_ID);

		//when & then
		mockMvc.perform(MockMvcRequestBuilders.get("/api/products/{productId}", 1L)
				.header(AUTHORIZATION, JWT_TOKEN_PREFIX + jwt.getAccessToken())
				.contentType(MediaType.APPLICATION_JSON))
			.andExpect(jsonPath("$.productName").value(productSaveAndUpdateRequest.getName()))
			.andExpect(jsonPath("$.content").value(productSaveAndUpdateRequest.getContent()))
			.andExpect(jsonPath("$.price").value(productSaveAndUpdateRequest.getPrice()))
			.andExpect(status().isOk());
	}

	@Test
	@DisplayName("수정 할 상품의 id와 내용을 받아 상품을 수정한다.")
	void update() throws Exception {
		// Given
		ProductSaveAndUpdateRequest productUpdateRequest = new ProductSaveAndUpdateRequest("수정", 2L, 100000L, "수정내용",
			4L,
			Arrays.asList(1L, 2L));

		saveDummyImage("imageTest1");
		saveDummyImage("imageTest2");
		Long productId = productService.save(productUpdateRequest, MEMBER_ID);
		String requestJson = objectMapper.writeValueAsString(productUpdateRequest);

		// When & Then
		mockMvc.perform(MockMvcRequestBuilders.put("/api/products/{productId}", productId)
				.header(AUTHORIZATION, JWT_TOKEN_PREFIX + jwt.getAccessToken())
				.contentType(MediaType.APPLICATION_JSON)
				.content(requestJson))
			.andExpect(status().isNoContent());
	}

	@Test
	@DisplayName("등록한 상품을 id를 통해 삭제한다 ")
	void delete() throws Exception {
		//given
		ProductSaveAndUpdateRequest productSaveAndUpdateRequest = new ProductSaveAndUpdateRequest("상품명", 1L, 100000L,
			"상품내용", 1L,
			Arrays.asList(1L, 2L));

		saveDummyImage("imageTest1");
		saveDummyImage("imageTest2");

		Long productId = productService.save(productSaveAndUpdateRequest, MEMBER_ID);
		String requestJson = objectMapper.writeValueAsString(productSaveAndUpdateRequest);

		// When & Then
		mockMvc.perform(MockMvcRequestBuilders.put("/api/products/{productId}", productId)
				.header(AUTHORIZATION, JWT_TOKEN_PREFIX + jwt.getAccessToken())
				.contentType(MediaType.APPLICATION_JSON)
				.content(requestJson))
			.andExpect(status().isNoContent());
	}

	@Test
	@DisplayName("상품 상태 변경시 해당 상품의 상태가 변경 된다")
	void updateStatus() throws Exception {
		//given
		ProductSaveAndUpdateRequest productSaveAndUpdateRequest = new ProductSaveAndUpdateRequest("상품명", 1L, 100000L,
			"상품내용", 1L,
			Arrays.asList(1L, 2L));

		saveDummyImage("imageTest1");
		saveDummyImage("imageTest2");

		productService.save(productSaveAndUpdateRequest, MEMBER_ID);

		ProductUpdateRequest productUpdateRequest = new ProductUpdateRequest("예약중");
		String request = objectMapper.writeValueAsString(productUpdateRequest);

		//when & then
		mockMvc.perform(MockMvcRequestBuilders.put("/api/products/{productId}/status", 1L)
				.header(AUTHORIZATION, JWT_TOKEN_PREFIX + jwt.getAccessToken())
				.contentType(MediaType.APPLICATION_JSON)
				.content(request))
			.andExpect(status().isNoContent());
	}

	@Test
	@DisplayName("카데고리별 상품 목록 조회 api를 통해 특정지역 및 카테고리에 해당하는 모든 상품을 조회할수 있다.")
	void findAll() throws Exception {
		// Given

		//1. 이미지 저장
		saveDummyImage("imageTest1");
		saveDummyImage("imageTest2");

		//2. 상품 저장
		ProductSaveAndUpdateRequest productRequestCat1Reg1 = new ProductSaveAndUpdateRequest("상품명", 1L, 100000L, "상품내용",
			1L, Arrays.asList(1L, 2L));
		productService.save(productRequestCat1Reg1, MEMBER_ID);

		ProductSaveAndUpdateRequest productRequestCat2Reg1 = new ProductSaveAndUpdateRequest("상품명", 2L, 100000L, "상품내용",
			1L, Arrays.asList(1L, 2L));
		productService.save(productRequestCat2Reg1, MEMBER_ID);

		ProductSaveAndUpdateRequest productRequestCat1Reg2 = new ProductSaveAndUpdateRequest("상품명", 1L, 100000L, "상품내용",
			2L, Arrays.asList(1L, 2L));
		productService.save(productRequestCat1Reg2, MEMBER_ID);

		//when & then
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/products")
				.param("regionId", "1")
				.param("categoryId", "1")
				.header(AUTHORIZATION, JWT_TOKEN_PREFIX + jwt.getAccessToken())
				.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$[0].id").exists())
			.andExpect(jsonPath("$[0].writerId").exists())
			.andExpect(jsonPath("$[0].thumbnailUrl").exists())
			.andExpect(jsonPath("$[0].name").exists())
			.andExpect(jsonPath("$[0].region").exists())
			.andExpect(jsonPath("$[0].createdAt").exists())
			.andExpect(jsonPath("$[0].status").exists())
			.andExpect(jsonPath("$[0].price").exists())
			.andExpect(jsonPath("$[0].likeCount").exists())
			.andExpect(jsonPath("$[0].chattingCount").exists())
			.andReturn();

		String responseBody = result.getResponse().getContentAsString();
		JSONArray jsonArray = new JSONArray(responseBody);
		Assertions.assertThat(jsonArray.length()).isEqualTo(1);
	}

	@Test
	@DisplayName("카데고리별 상품 목록 조회 요청시 categoryId 가 null 이면 특정 지역에 관련된 모든 상품목록을 응답으로 전송한다.")
	void findAllWithNoCategoryId() throws Exception {
		// Given

		//1. 이미지 저장
		saveDummyImage("imageTest1");
		saveDummyImage("imageTest2");

		//2. 상품 저장
		ProductSaveAndUpdateRequest productRequestCat1Reg1 = new ProductSaveAndUpdateRequest("상품명", 1L, 100000L, "상품내용",
			1L, Arrays.asList(1L, 2L));
		productService.save(productRequestCat1Reg1, MEMBER_ID);

		ProductSaveAndUpdateRequest productRequestCat2Reg1 = new ProductSaveAndUpdateRequest("상품명", 2L, 100000L, "상품내용",
			1L, Arrays.asList(1L, 2L));
		productService.save(productRequestCat2Reg1, MEMBER_ID);

		ProductSaveAndUpdateRequest productRequestCat1Reg2 = new ProductSaveAndUpdateRequest("상품명", 1L, 100000L, "상품내용",
			2L, Arrays.asList(1L, 2L));
		productService.save(productRequestCat1Reg2, MEMBER_ID);

		//when & then
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/products")
				.param("regionId", "1")
				.header(AUTHORIZATION, JWT_TOKEN_PREFIX + jwt.getAccessToken())
				.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$[0].id").exists())
			.andExpect(jsonPath("$[0].writerId").exists())
			.andExpect(jsonPath("$[0].thumbnailUrl").exists())
			.andExpect(jsonPath("$[0].name").exists())
			.andExpect(jsonPath("$[0].region").exists())
			.andExpect(jsonPath("$[0].createdAt").exists())
			.andExpect(jsonPath("$[0].status").exists())
			.andExpect(jsonPath("$[0].price").exists())
			.andExpect(jsonPath("$[0].likeCount").exists())
			.andExpect(jsonPath("$[0].chattingCount").exists())
			.andReturn();

		String responseBody = result.getResponse().getContentAsString();
		JSONArray jsonArray = new JSONArray(responseBody);
		Assertions.assertThat(jsonArray.length()).isEqualTo(2);
	}
}
