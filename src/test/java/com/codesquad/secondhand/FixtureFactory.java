package com.codesquad.secondhand;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.status.Status;
import com.codesquad.secondhand.domain.user.MyRegion;
import com.codesquad.secondhand.domain.user.User;

public abstract class FixtureFactory {

	public static final LocalDateTime LOCAL_DATE_TIME = LocalDateTime.now();

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

	public static List<Image> createImageFixtures(int size) {
		return IntStream.rangeClosed(1, size)
			.mapToObj(i -> new Image(null, "imageUrl" + i + ".jpg"))
			.collect(Collectors.toList());
	}

	public static Item createItemFixtures(User user, Category category, Region region, Status status) {
		return new Item(user, category, region, status, LOCAL_DATE_TIME, "title", "content", null);
	}

	public static List<Status> createStatusFixtures() {
		Status forSale = new Status(1L, "판매중");
		Status soleOut = new Status(2L, "판매완료");
		Status reservation = new Status(3L, "예약중");
		return List.of(forSale, soleOut, reservation);
	}

}
