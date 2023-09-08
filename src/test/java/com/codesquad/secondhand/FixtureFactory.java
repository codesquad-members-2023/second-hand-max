package com.codesquad.secondhand;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.user.MyRegion;
import com.codesquad.secondhand.domain.user.User;

public abstract class FixtureFactory {

	public static List<Region> createRegionFixtures(int size) {
		return IntStream.rangeClosed(1, size)
			.mapToObj(i -> new Region(null, "test region" + i))
			.collect(Collectors.toList());
	}

	public static List<Region> createRegionFixtures(int size, String title) {
		return IntStream.rangeClosed(1, size)
			.mapToObj(i -> new Region(null, title + i))
			.collect(Collectors.toList());
	}

	public static List<Category> createCategoryFixtures(int size) {
		return IntStream.rangeClosed(1, size)
			.mapToObj(i -> new Category((long)i, "category" + i, "http://url" + i + ".com"))
			.collect(Collectors.toList());
	}

	public static User createUserFixture(List<Region> regions) {
		User user = new User(null, new MyRegion(), null, Provider.ofLocal(), null, "nickname", "test@email.com",
			"password123!");
		regions.forEach(user::addUserRegion);
		return user;
	}

	public static User createUserFixture(List<Region> regions, String nickname, String email) {
		User user = new User(null, new MyRegion(), null, Provider.ofLocal(), null, nickname, email,
			"password123!");
		regions.forEach(user::addUserRegion);
		return user;
	}

}
