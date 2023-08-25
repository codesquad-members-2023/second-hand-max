package com.codesquad.secondhand.api.service.category;

import static org.assertj.core.api.AssertionsForClassTypes.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.api.service.category.response.CategoryResponse;
import com.codesquad.secondhand.domain.category.CategoryRepository;

public class CategoryServiceTest extends IntegrationTestSupport {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private CategoryRepository categoryRepository;

	@BeforeEach
	private void init() {
		categoryRepository.deleteAllInBatch();
	}

	@DisplayName("카테고리 목록을 조회한다.")
	@Test
	void listAllCategories() {
		//given
		int numCategories = 22;
		categoryRepository.saveAll(FixtureFactory.createCategoryFixture(numCategories));

		//when
		List<CategoryResponse> categories = categoryService.getCategories();

		//then
		assertThat(categories.size()).isEqualTo(numCategories);
	}

}
