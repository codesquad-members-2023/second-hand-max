package com.codesquad.secondhand.domain.item;

import static org.assertj.core.api.Assertions.*;

import java.util.Collection;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.category.CategoryRepository;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.image.ImageRepository;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.domain.status.Status;
import com.codesquad.secondhand.domain.status.StatusRepository;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.exception.auth.PermissionDeniedException;
import com.codesquad.secondhand.exception.item_image.NoSuchItemImageException;

public class ItemTest extends IntegrationTestSupport {

	private static List<Category> categories;
	private static List<Region> regions;
	private static List<Status> statusList;
	private static User loginUser;
	@Autowired
	private ItemRepository itemRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ImageRepository imageRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private RegionRepository regionRepository;
	@Autowired
	private StatusRepository statusRepository;

	@BeforeEach
	void init() {
		categories = FixtureFactory.createCategoryFixtures(3);
		categoryRepository.saveAll(categories);
		regions = FixtureFactory.createRegionFixtures(2);
		regionRepository.saveAll(regions);
		statusList = FixtureFactory.createStatusFixtures();
		statusRepository.saveAll(statusList);
		loginUser = FixtureFactory.createUserFixture(List.of(regions.get(0)));
		userRepository.save(loginUser);
	}

	@DisplayName("상품 이미지 저장을 성공한다.")
	@Test
	void addItemImage() {
		// given
		Item newItem = FixtureFactory.createItemFixtures(loginUser, categories.get(0), regions.get(0),
			statusList.get(0));
		itemRepository.save(newItem);

		List<Image> images = FixtureFactory.createImageFixtures(3);
		imageRepository.saveAll(images);

		// when
		newItem.addItemImages(images);

		// then
		assertThat(newItem.listImage()).hasSize(images.size());
	}


	@DisplayName("상품 이미지 삭제 시나리오")
	@TestFactory
	Collection<DynamicTest> removeItemImage() {
		//given
		Item newItem = FixtureFactory.createItemFixtures(loginUser, categories.get(0), regions.get(0), statusList.get(0));
		List<Image> itemImages = FixtureFactory.createImageFixtures(2);
		imageRepository.saveAll(itemImages);
		List<Image> otherImage = FixtureFactory.createImageFixtures(1);
		imageRepository.saveAll(otherImage);

		return List.of(
			DynamicTest.dynamicTest("존재하지 않는 상품 이미지를 삭제하는 경우 예외가 발생한다.", () -> {
				// when & then
				assertThatThrownBy(() -> newItem.removeItemImage(itemImages.get(0)))
					.isInstanceOf(NoSuchItemImageException.class)
					.hasMessage("존재하지 않는 상품 이미지입니다");
			}),
			DynamicTest.dynamicTest("현재 상품의 이미지가 아닌 다른 이미지를 삭제하는 경우 예외가 발생한다.", () -> {
				// given
				newItem.addItemImages(itemImages);

				// when & then
				assertThatThrownBy(() -> newItem.removeItemImage(otherImage.get(0)))
					.isInstanceOf(NoSuchItemImageException.class)
					.hasMessage("존재하지 않는 상품 이미지입니다");
			}),
			DynamicTest.dynamicTest("상품 이미지를 삭제할 수 있다.", () -> {
				// when
				newItem.removeItemImage(itemImages.get(0));

				//then
				assertThat(newItem.listImage()).hasSize(1);
			})
		);
	}

	@DisplayName("상품 삭제 시나리오")
	@TestFactory
	Collection<DynamicTest> deleteItem() {
		// given
		User otherUser = FixtureFactory.createUserFixture(regions);
		userRepository.save(otherUser);
		Item myItem = FixtureFactory.createItemFixtures(loginUser, categories.get(0), regions.get(0),
			statusList.get(0));
		itemRepository.save(myItem);
		Item otherItem = FixtureFactory.createItemFixtures(otherUser, categories.get(0), regions.get(0),
			statusList.get(0));
		itemRepository.save(otherItem);

		return List.of(
			DynamicTest.dynamicTest("상품 삭제를 성공한다.", () -> {
				// when
				myItem.delete(loginUser.getId());

				// then
				assertThat(myItem.isDeleted()).isTrue();
			}),
			DynamicTest.dynamicTest("상품 삭제 시 로그인 사용자와 판매자가 다른 경우 예외를 발생한다.", () -> {
				// when & then
				assertThatThrownBy(() -> otherItem.delete(loginUser.getId()))
					.isInstanceOf(PermissionDeniedException.class)
					.hasMessage("허가되지 않은 접근입니다");
			})
		);
	}
}
