package com.codesquad.secondhand.api.controller.category;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.service.category.CategoryService;
import com.codesquad.secondhand.api.service.category.response.CategoryResponse;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/categories")
@RequiredArgsConstructor
@RestController
public class CategoryController {

	private final CategoryService categoryService;

	@GetMapping
	public ApiResponse<List<CategoryResponse>> listCategories() {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.CATEGORY_FETCH_SUCCESS.getMessage(),
			categoryService.getCategories());
	}

}
