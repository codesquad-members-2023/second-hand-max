package com.codesquad.secondhand.api.controller.category;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.service.category.CategoryService;
import com.codesquad.secondhand.api.service.category.response.CategoryResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/categories")
public class CategoryController {

	private final CategoryService categoryService;

	@GetMapping
	public ApiResponse<List<CategoryResponse>> show() {
		return ApiResponse.of(HttpStatus.OK, "카테고리 목록 조회를 성공하였습니다.", categoryService.getCategories());
	}
}
