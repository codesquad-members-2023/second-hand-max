package com.codesquad.secondhand;

import static org.mockito.BDDMockito.*;

import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.codesquad.secondhand.api.controller.category.CategoryController;
import com.codesquad.secondhand.api.controller.region.RegionController;
import com.codesquad.secondhand.api.controller.user.UserController;
import com.codesquad.secondhand.api.controller.user_region.UserRegionController;
import com.codesquad.secondhand.api.service.auth.jwt.JwtService;
import com.codesquad.secondhand.api.service.category.CategoryService;
import com.codesquad.secondhand.api.service.image.ImageService;
import com.codesquad.secondhand.api.service.region.RegionService;
import com.codesquad.secondhand.api.service.user.UserService;
import com.codesquad.secondhand.api.service.user_region.UserRegionService;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@WebMvcTest(controllers = {
	RegionController.class,
	UserController.class,
	UserRegionController.class,
	CategoryController.class
})
public abstract class ControllerTestSupport {

	@Autowired
	protected MockMvc mockMvc;

	@Autowired
	protected ObjectMapper objectMapper;

	@MockBean
	protected RegionService regionService;

	@MockBean
	protected UserRegionService userRegionService;

	@MockBean
	protected CategoryService categoryService;

	@MockBean
	protected JwtService jwtService;

	@MockBean
	protected UserService userService;

	@MockBean
	protected ImageService imageService;

	public void mockingJwtService() {
		given(jwtService.parse(Mockito.any())).willReturn(createMockClaims());
	}

	private Claims createMockClaims() {
		Claims claims = Jwts.claims();
		claims.put("id", 1L);
		return claims;
	}

}
