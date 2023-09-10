package com.codesquad.secondhand.domain.item;

import static org.assertj.core.api.Assertions.*;

import java.util.Collection;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.image.ImageRepository;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.status.Status;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.exception.item_image.NoSuchItemImageException;

public class ItemTest extends IntegrationTestSupport {

	@Autowired
	private ImageRepository imageRepository;

	@DisplayName("상품 이미지 저장 시나리오")
	@TestFactory
	Collection<DynamicTest> addItemImage() {
		//given
		List<Category> categories = FixtureFactory.createCategoryFixture(1);
		List<Region> regions = FixtureFactory.createRegionFixtures(1);
		User seller = FixtureFactory.createUserFixtureWithRegions(List.of(regions.get(0)));
		List<Status> statusList = FixtureFactory.createStatusFixtures();
		Item newItem = FixtureFactory.createItemFixtures(seller, categories.get(0), regions.get(0), statusList.get(0));

		return List.of(
			DynamicTest.dynamicTest("상품 이미지를 저장할 수 있다.", () -> {
				// given
				List<Image> images = FixtureFactory.createImageListFixtures(3);
				// imageRepository.saveAll(images);

				// when
				newItem.addItemImages(images);

				//then
				assertThat(newItem.listItemImage()).hasSize(3);
			})
		);
	}

	@DisplayName("상품 이미지 삭제 시나리오")
	@TestFactory
	Collection<DynamicTest> removeItemImage() {
		//given
		List<Category> categories = FixtureFactory.createCategoryFixture(1);
		List<Region> regions = FixtureFactory.createRegionFixtures(1);
		User seller = FixtureFactory.createUserFixtureWithRegions(List.of(regions.get(0)));
		List<Status> statusList = FixtureFactory.createStatusFixtures();
		Item newItem = FixtureFactory.createItemFixtures(seller, categories.get(0), regions.get(0), statusList.get(0));
		List<Image> images = FixtureFactory.createImageListFixtures(2);
		imageRepository.saveAll(images);

		return List.of(
			DynamicTest.dynamicTest("상품 이미지가 null일 때 삭제하는 경우 예외가 발생한다.", () -> {
				// when & then
				assertThatThrownBy(() -> newItem.removeItemImage(images.get(0)))
					.isInstanceOf(NoSuchItemImageException.class)
					.hasMessage("존재하지 않는 상품 이미지입니다");
			}),
			DynamicTest.dynamicTest("등록하지 않은 상품 이미지를 삭제하는 경우 예외가 발생한다.", () -> {
				// given
				newItem.addItemImages(images);
				List<Image> otherImage = FixtureFactory.createImageListFixtures(1);

				// when & then
				assertThatThrownBy(() -> newItem.removeItemImage(otherImage.get(0)))
					.isInstanceOf(NoSuchItemImageException.class)
					.hasMessage("존재하지 않는 상품 이미지입니다");
			}),
			DynamicTest.dynamicTest("상품 이미지를 삭제할 수 있다.", () -> {
				// when
				newItem.removeItemImage(images.get(0));

				//then
				assertThat(newItem.listItemImage()).hasSize(1);
			})
		);
	}

}
