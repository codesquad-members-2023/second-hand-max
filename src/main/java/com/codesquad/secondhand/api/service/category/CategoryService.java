package com.codesquad.secondhand.api.service.category;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.service.category.response.CategoryResponse;
import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.category.CategoryRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CategoryService {

	private final CategoryRepository categoryRepository;

	@Transactional(readOnly = true)
	public List<CategoryResponse> getCategories() {
		List<Category> categories = categoryRepository.findAll();

		return categories.stream()
			.map(CategoryResponse::from)
			.collect(Collectors.toList());
	}
}
