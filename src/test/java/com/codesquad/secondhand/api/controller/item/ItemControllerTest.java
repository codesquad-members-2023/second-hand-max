package com.codesquad.secondhand.api.controller.item;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;

import com.codesquad.secondhand.ControllerTestSupport;
import com.codesquad.secondhand.annotation.SignInUser;
import com.codesquad.secondhand.api.controller.item.request.ItemPostingRequest;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.user.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class ItemControllerTest extends ControllerTestSupport {

	@BeforeEach
	void mockingJwtService() {
		given(jwtService.parse(Mockito.any())).willReturn(createMockClaims());
		Provider provider = new Provider(Provider.ofLocal().getId(), Provider.ofLocal().getType());
		User user = new User(1L, null, null, provider, null, "name", "email@email.com", "password1!");
	}

	private Claims createMockClaims() {
		Claims claims = Jwts.claims();
		claims.put("id", 1L);
		return claims;
	}

	@DisplayName("새로운 상품을 등록하고 201을 응답한다.")
	@Test
	void postItem() throws Exception {
		// given
		SignInUser signInUser = new SignInUser(1L);
		ItemPostingRequest request = new ItemPostingRequest("title", null, "content", List.of(1L, 2L), 1L, 1L);

		// when
		ObjectMapper objectMapper = new ObjectMapper();
		when(imageService.findImagesByIds(request.getImageIds())).thenReturn(
			List.of(new Image(1L, "1.jpg"), new Image(2L, "2.jpg")));

		// then
		mockMvc.perform(post("/api/items")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(request))
				.header("Authorization", "Bearer test-access-token"))
			.andDo(print())
			.andExpect(status().isCreated());
	}

}
