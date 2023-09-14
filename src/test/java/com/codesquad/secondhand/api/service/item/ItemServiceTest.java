package com.codesquad.secondhand.api.service.item;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.api.controller.item.response.ItemDetailResponse;
import com.codesquad.secondhand.api.service.item.request.ItemPostServiceRequest;
import com.codesquad.secondhand.api.service.item.request.ItemStatusUpdateServiceRequest;
import com.codesquad.secondhand.api.service.item.request.ItemUpdateServiceRequest;
import com.codesquad.secondhand.api.service.item.response.ItemSliceResponse;
import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.category.CategoryRepository;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.image.ImageRepository;
import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.item.ItemRepository;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.domain.status.Status;
import com.codesquad.secondhand.domain.status.StatusRepository;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.exception.auth.PermissionDeniedException;
import com.codesquad.secondhand.exception.category.NoSuchCategoryException;
import com.codesquad.secondhand.exception.item.NoSuchItemException;
import com.codesquad.secondhand.exception.region.NoSuchRegionException;
import com.codesquad.secondhand.exception.user.NoSuchUserException;
import com.codesquad.secondhand.exception.user_region.NoSuchUserRegionException;

public class ItemServiceTest extends IntegrationTestSupport {

	private static List<Region> regions;
	private static List<Category> categories;
	private static User loginUser;
	private static List<Image> images;
	private static List<Status> statusList;

	@Autowired
	private ItemService itemService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RegionRepository regionRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private StatusRepository statusRepository;

	@Autowired
	private ImageRepository imageRepository;

	@Autowired
	private ItemRepository itemRepository;

	@BeforeEach
	void init() {
		regions = FixtureFactory.createRegionFixtures(3);
		regionRepository.saveAll(regions);

		loginUser = FixtureFactory.createUserFixture(List.of(regions.get(0), regions.get(1)));
		userRepository.save(loginUser);

		categories = FixtureFactory.createCategoryFixtures(5);
		categoryRepository.saveAll(categories);

		images = FixtureFactory.createImageFixtures(3);
		imageRepository.saveAll(images);

		statusList = FixtureFactory.createStatusFixtures();
		statusRepository.saveAll(statusList);
	}

	@DisplayName("지역별 카테고리별 상품 목록 조회 시나리오")
	@TestFactory
	Collection<DynamicTest> findFilteredItemList() {
		// given
		List<Item> items1 = FixtureFactory.createItemFixtures(6, loginUser, categories.get(1), regions.get(0),
			statusList.get(0));
		List<Item> items2 = FixtureFactory.createItemFixtures(8, loginUser, categories.get(2), regions.get(0),
			statusList.get(1));
		itemRepository.saveAll(items1);
		itemRepository.saveAll(items2);
		Pageable pageable = PageRequest.of(0, 10);

		return List.of(
			DynamicTest.dynamicTest("1번 지역 및 전체 카테고리에 해당하는 상품 목록 조회를 성공한다.", () -> {
				// given
				Long categoryId = 1L;
				Long regionId = 1L;

				// when
				ItemSliceResponse response = itemService.findFilteredItemList(categoryId, regionId, pageable);

				// then
				assertAll(
					() -> assertThat(response.isHasMore()).isTrue(),
					() -> assertThat(response.getItems()).hasSize(10)
				);
			}),
			DynamicTest.dynamicTest("1번 지역 및 2번 카테고리에 해당하는 상품 목록 조회를 성공한다.", () -> {
				// given
				Long categoryId = 2L;
				Long regionId = 1L;

				// when
				ItemSliceResponse response = itemService.findFilteredItemList(categoryId, regionId, pageable);

				// then
				assertAll(
					() -> assertThat(response.isHasMore()).isFalse(),
					() -> assertThat(response.getItems()).hasSize(6)
				);
			}),
			DynamicTest.dynamicTest("1번 지역 및 3번 카테고리에 해당하는 상품 목록 조회를 성공한다.", () -> {
				// given
				Long categoryId = 3L;
				Long regionId = 1L;

				// when
				ItemSliceResponse response = itemService.findFilteredItemList(categoryId, regionId, pageable);

				// then
				assertAll(
					() -> assertThat(response.isHasMore()).isFalse(),
					() -> assertThat(response.getItems()).hasSize(8)
				);
			})
		);
	}

	@DisplayName("새로운 상품 등록을 성공한다.")
	@Test
	void postItem() {
		// given
		ItemPostServiceRequest request = new ItemPostServiceRequest("title", null, "content", images,
			1L, 1L);

		// when
		itemService.postItem(request, loginUser.getId());
		Item postedItem = itemRepository.findDetailById(1L).orElseThrow(NoSuchItemException::new);

		// then
		assertAll(
			() -> assertThat(postedItem.getUser().getId()).isEqualTo(loginUser.getId()),
			() -> assertThat(postedItem.getTitle()).isEqualTo("title"),
			() -> assertThat(postedItem.getPrice()).isNull(),
			() -> assertThat(postedItem.getContent()).isEqualTo("content"),
			() -> assertThat(postedItem.listImage()).hasSize(images.size()),
			() -> assertThat(postedItem.getCategory().getId()).isEqualTo(1L),
			() -> assertThat(postedItem.getRegion().getId()).isEqualTo(1L)
		);
	}

	@DisplayName("존재하지 않는 사용자가 상품을 등록하면 예외가 발생한다.")
	@Test
	void postItemAndThrowUserException() {
		// given
		Long wrongUserId = 999L;
		ItemPostServiceRequest request = new ItemPostServiceRequest("title", null, "content", images,
			1L, 1L);

		// when & then
		assertThatThrownBy(() -> itemService.postItem(request, wrongUserId))
			.isInstanceOf(NoSuchUserException.class)
			.hasMessage("존재하지 않는 사용자입니다");

	}

	@DisplayName("상품 등록 시 존재하지 않는 카테고리를 설정하면 예외가 발생한다.")
	@Test
	void postItemAndThrowCategoryException() {
		// given
		Long wrongCategoryId = 999L;
		ItemPostServiceRequest request = new ItemPostServiceRequest("title", null, "content", images,
			wrongCategoryId, 1L);

		// when & then
		assertThatThrownBy(() -> itemService.postItem(request, loginUser.getId()))
			.isInstanceOf(NoSuchCategoryException.class)
			.hasMessage("존재하지 않는 카테고리입니다");
	}

	@DisplayName("상품 등록 시 존재하지 않는 지역을 설정하면 예외가 발생한다.")
	@Test
	void postItemAndThrowRegionException() {
		// given
		Long wrongRegionId = 999L;
		ItemPostServiceRequest request = new ItemPostServiceRequest("title", null, "content", images,
			1L, wrongRegionId);

		// when & then
		assertThatThrownBy(() -> itemService.postItem(request, loginUser.getId()))
			.isInstanceOf(NoSuchRegionException.class)
			.hasMessage("존재하지 않는 동네입니다");
	}

	@DisplayName("상품 등록 시 나의 동네가 아닌 지역을 설정하면 예외가 발생한다.")
	@Test
	void postItemAndThrowMyRegionException() {
		// given
		Long notMyRegionId = 3L;
		ItemPostServiceRequest request = new ItemPostServiceRequest("title", null, "content", images,
			1L, notMyRegionId);

		// when & then
		assertThatThrownBy(() -> itemService.postItem(request, loginUser.getId()))
			.isInstanceOf(NoSuchUserRegionException.class)
			.hasMessage("사용자 동네 목록에 없는 동네입니다");
	}

	@DisplayName("상품 상세 조회를 성공한다.")
	@Test
	void getItemDetail() {
		// given
		User seller = FixtureFactory.createUserFixture(List.of(regions.get(0)));
		userRepository.save(seller);
		Item item = FixtureFactory.createItemFixture(seller, categories.get(0), regions.get(0), statusList.get(0));
		item.addItemImages(images);
		itemRepository.save(item);

		// when
		ItemDetailResponse postedItem = itemService.getItemDetail(1L, loginUser.getId());

		// then
		assertAll(
			() -> assertThat(postedItem.getTitle()).isEqualTo("title"),
			() -> assertThat(postedItem.getStatus()).isEqualTo("판매중"),
			() -> assertThat(postedItem.getContent()).isEqualTo("content"),
			() -> assertThat(postedItem.getUpdatedAt()).isCloseTo(item.getUpdatedAt(),
				within(1, ChronoUnit.SECONDS)),
			() -> assertThat(postedItem.getPrice()).isNull(),
			() -> assertThat(postedItem.getCategory()).isEqualTo(categories.get(0).getTitle()),
			() -> assertThat(postedItem.getSeller().getId()).isEqualTo(seller.getId()),
			() -> assertThat(postedItem.getNumChat()).isEqualTo(0),
			() -> assertThat(postedItem.getNumLikes()).isEqualTo(0),
			() -> assertThat(postedItem.getNumViews()).isEqualTo(0),
			() -> assertThat(postedItem.getImages()).hasSize(images.size())
		);
	}

	@DisplayName("존재하지 않는 상품을 상세 조회하면 예외가 발생한다.")
	@Test
	void getItemDetailAndThrowNoSuchItemException() {
		// given
		Long wrongItemId = 999L;

		// when & then
		assertThatThrownBy(() -> itemService.getItemDetail(wrongItemId, loginUser.getId()))
			.isInstanceOf(NoSuchItemException.class)
			.hasMessage("존재하지 않는 상품입니다");
	}

	@DisplayName("상품 삭제를 성공한다.")
	@Test
	void deleteItem() {
		// given
		Item item = FixtureFactory.createItemFixture(loginUser, categories.get(0), regions.get(0), statusList.get(0));
		itemRepository.save(item);

		// when
		itemService.deleteItem(1L, loginUser.getId());

		// then
		Item deletedItem = itemRepository.findById(1L).orElseThrow(NoSuchItemException::new);
		assertThat(deletedItem.isDeleted()).isEqualTo(true);
	}

	@DisplayName("다른 사용자의 상품을 삭제하면 예외가 발생한다.")
	@Test
	void deleteItemAndThrowPermissionDeniedException() {
		// given
		User otheruser = FixtureFactory.createUserFixture(List.of(regions.get(0)));
		userRepository.save(otheruser);
		Item item = FixtureFactory.createItemFixture(otheruser, categories.get(0), regions.get(0), statusList.get(0));
		itemRepository.save(item);

		// when & then
		assertThatThrownBy(() -> itemService.deleteItem(1L, loginUser.getId()));
	}

	@DisplayName("상품 수정 시나리오")
	@TestFactory
	Collection<DynamicTest> updateItem() {
		// given
		Item myItem = FixtureFactory.createItemFixture(loginUser, categories.get(0), regions.get(0),
			statusList.get(0));
		itemRepository.save(myItem);
		myItem.addItemImages(images);

		return List.of(
			DynamicTest.dynamicTest("새로운 내용 및 모든 이미지 삭제가 반영되도록 상품 수정을 성공한다.", () -> {
				// given
				ItemUpdateServiceRequest request = new ItemUpdateServiceRequest(1L, "new title", 100, "new content",
					null, 1L, 1L);

				// when
				itemService.updateItem(request, loginUser.getId());

				// then
				Item updatedItem = itemRepository.findDetailById(1L).get();
				assertAll(
					() -> assertThat(updatedItem.getTitle()).isEqualTo("new title"),
					() -> assertThat(updatedItem.getPrice()).isEqualTo(100),
					() -> assertThat(updatedItem.getContent()).isEqualTo("new content"),
					() -> assertThat(updatedItem.listImage()).isEmpty(),
					() -> assertThat(updatedItem.getCategory().getId()).isEqualTo(1L),
					() -> assertThat(updatedItem.getRegion().getId()).isEqualTo(1L)
				);
			}),
			DynamicTest.dynamicTest("새로운 내용 및 새로운 이미지가 반영되도록 상품 수정을 성공한다.", () -> {
				// given
				ItemUpdateServiceRequest request = new ItemUpdateServiceRequest(1L, "new title2", 200, "new content2",
					images, 2L, 2L);

				// when
				itemService.updateItem(request, loginUser.getId());

				// then
				Item updatedItem = itemRepository.findDetailById(1L).get();
				assertAll(
					() -> assertThat(updatedItem.getTitle()).isEqualTo("new title2"),
					() -> assertThat(updatedItem.getPrice()).isEqualTo(200),
					() -> assertThat(updatedItem.getContent()).isEqualTo("new content2"),
					() -> assertThat(updatedItem.listImage()).hasSize(3),
					() -> assertThat(updatedItem.getCategory().getId()).isEqualTo(2L),
					() -> assertThat(updatedItem.getRegion().getId()).isEqualTo(2L)
				);
			})
		);
	}

	@DisplayName("상품 상태 수정을 성공한다.")
	@Test
	void updateItemStatus() {
		// given
		Item myItem = FixtureFactory.createItemFixture(loginUser, categories.get(0), regions.get(0),
			statusList.get(0));
		itemRepository.save(myItem);
		ItemStatusUpdateServiceRequest request = new ItemStatusUpdateServiceRequest(1L, 3L);

		// when
		itemService.updateItemStatus(request, loginUser.getId());

		// then
		Item updatedItem = itemRepository.findDetailById(1L).get();
		assertAll(
			() -> assertThat(updatedItem.getStatus().getId()).isEqualTo(3L),
			() -> assertThat(updatedItem.getStatus().getType()).isEqualTo("예약중")
		);
	}

	@DisplayName("다른 사람의 상품 상태 수정 시 예외를 발생한다.")
	@Test
	void updateItemStatusAndThrowPermissionDeniedException() {
		// given
		User otheruser = FixtureFactory.createUserFixture(List.of(regions.get(0)));
		userRepository.save(otheruser);
		Item notMyItem = FixtureFactory.createItemFixture(otheruser, categories.get(0), regions.get(0),
			statusList.get(0));
		itemRepository.save(notMyItem);
		ItemStatusUpdateServiceRequest request = new ItemStatusUpdateServiceRequest(1L, 3L);

		// when & then
		assertThatThrownBy(() -> itemService.updateItemStatus(request, loginUser.getId()))
			.isInstanceOf(PermissionDeniedException.class)
			.hasMessage("허가되지 않은 접근입니다");
	}

}
