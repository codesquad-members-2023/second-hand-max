package com.codesquad.secondhand;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.codesquad.secondhand.api.controller.category.CategoryController;
import com.codesquad.secondhand.api.controller.region.RegionController;
import com.codesquad.secondhand.api.controller.user_region.UserRegionController;
import com.codesquad.secondhand.api.service.category.CategoryService;
import com.codesquad.secondhand.api.service.region.RegionService;
import com.codesquad.secondhand.api.service.user_region.UserRegionService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(controllers = {
	RegionController.class,
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

}
