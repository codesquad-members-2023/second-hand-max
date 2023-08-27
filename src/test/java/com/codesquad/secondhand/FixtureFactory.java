package com.codesquad.secondhand;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.region.Region;

public abstract class FixtureFactory {

	public static List<Region> createRegionFixture(int size) {
		return IntStream.rangeClosed(1, size)
			.mapToObj(i -> new Region(null, "test region" + i))
			.collect(Collectors.toList());
	}

	public static List<Category> createCategoryFixture(int size) {
		return IntStream.rangeClosed(1, size)
			.mapToObj(i -> new Category((long)i, "category" + i, "http://url" + i + ".com"))
			.collect(Collectors.toList());
	}

}
