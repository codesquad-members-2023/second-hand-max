package com.codesquad.secondhand.api.service.user;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Collection;
import java.util.List;

import com.codesquad.secondhand.exception.ErrorResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.api.service.item.response.ItemTransactionSliceResponse;
import com.codesquad.secondhand.api.service.user.request.UserCreateServiceRequest;
import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.category.CategoryRepository;
import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.item.ItemRepository;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.domain.status.Status;
import com.codesquad.secondhand.domain.status.StatusRepository;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.exception.user.DuplicatedEmailException;
import com.codesquad.secondhand.exception.user.DuplicatedNicknameException;

class UserServiceTest extends IntegrationTestSupport {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RegionRepository regionRepository;

	@Autowired
	private ItemRepository itemRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private StatusRepository statusRepository;

	@DisplayName("사용자 등록 시나리오")
	@TestFactory
	Collection<DynamicTest> createLocalUser() {
		// given
		Region region = regionRepository.save(new Region(null, "default"));

		return List.of(
			DynamicTest.dynamicTest("사용자 등록에 성공한다.", () -> {
				// given
				UserCreateServiceRequest request = new UserCreateServiceRequest(
					"mine", "mine@email.com", "password123!",
					null, Provider.ofLocal(), region);

				// when
				userService.createUser(request);

				// then
				assertThat(userRepository.findAll()).hasSize(1);
			}),
			DynamicTest.dynamicTest("이미 사용 중인 이메일로 등록을 시도하는 경우 예외가 발생한다.", () -> {
				// given
				UserCreateServiceRequest request = new UserCreateServiceRequest(
					"your", "mine@email.com", "password123!",
					null, Provider.ofLocal(), region);

				// when // then
				assertThatThrownBy(() -> userService.createUser(request))
					.isInstanceOf(DuplicatedEmailException.class)
					.hasMessage(ErrorResponse.DUPLICATED_EMAIL_EXCEPTION.getMessage());
			}),
			DynamicTest.dynamicTest("이미 사용 중인 닉네임으로 등록을 시도하는 경우 예외가 발생한다.", () -> {
				// given
				UserCreateServiceRequest request = new UserCreateServiceRequest(
					"mine", "your@email.com", "password123!",
					null, Provider.ofLocal(), region);

				// when // then
				assertThatThrownBy(() -> userService.createUser(request))
					.isInstanceOf(DuplicatedNicknameException.class)
					.hasMessage(ErrorResponse.DUPLICATED_NICKNAME_EXCEPTION.getMessage());
			}),
			DynamicTest.dynamicTest("닉네임과 이메일이 중복되지 않는 새로운 사용자 등록에 성공한다.", () -> {
				// given
				UserCreateServiceRequest request = new UserCreateServiceRequest(
					"your", "your@email.com", "password123!",
					null, Provider.ofLocal(), region);

				// when
				userService.createUser(request);

				// then
				assertThat(userRepository.findAll()).hasSize(2);
			}),
			DynamicTest.dynamicTest("Provider가 다르고 이메일이 중복된 새로운 사용자 등록에 성공한다.", () -> {
				// given
				UserCreateServiceRequest request =
					UserCreateServiceRequest.from("your@email.com", Provider.ofKakao(), region);

				// when
				userService.createUser(request);

				// then
				assertThat(userRepository.findAll()).hasSize(3);
			})
		);
	}

	@DisplayName("상품 상태별 사용자 판매 내역 조회 시나리오")
	@TestFactory
	Collection<DynamicTest> findUserTransactionList() {
		// given
		List<Region> regions = FixtureFactory.createRegionFixtures(2);
		regionRepository.saveAll(regions);
		List<Category> categories = FixtureFactory.createCategoryFixtures(3);
		categoryRepository.saveAll(categories);
		List<Status> statusList = FixtureFactory.createStatusFixtures();
		statusRepository.saveAll(statusList);
		User loginUser = FixtureFactory.createUserFixture(regions);
		userRepository.save(loginUser);
		Item forSaleItem = FixtureFactory.createItemFixture(loginUser, categories.get(0), regions.get(0),
			statusList.get(0));
		Item soldOutItem = FixtureFactory.createItemFixture(loginUser, categories.get(0), regions.get(0),
			statusList.get(1));
		Item reservationItem = FixtureFactory.createItemFixture(loginUser, categories.get(0), regions.get(0),
			statusList.get(2));
		itemRepository.save(forSaleItem);
		itemRepository.save(soldOutItem);
		itemRepository.save(reservationItem);
		Pageable pageable = PageRequest.of(0, 10);

		return List.of(
			DynamicTest.dynamicTest("전체 판매 상품 조회를 성공한다.", () -> {
				// given
				List<Long> statusIds = null;

				// when
				ItemTransactionSliceResponse response = userService.findUserTransactionList(loginUser.getId(),
					statusIds, pageable);

				// then
				assertAll(
					() -> assertThat(response.isHasMore()).isFalse(),
					() -> assertThat(response.getItems().size()).isEqualTo(3)
				);
			}),
			DynamicTest.dynamicTest("판매 완료 상품 조회를 성공한다.", () -> {
				// given
				List<Long> statusIds = List.of(2L);

				// when
				ItemTransactionSliceResponse response = userService.findUserTransactionList(loginUser.getId(),
					statusIds, pageable);

				// then
				assertAll(
					() -> assertThat(response.isHasMore()).isFalse(),
					() -> assertThat(response.getItems().size()).isEqualTo(1)
				);
			}),
			DynamicTest.dynamicTest("판매중 및 예약중 상품 조회를 성공한다.", () -> {
				// given
				List<Long> statusIds = List.of(1L, 3L);

				// when
				ItemTransactionSliceResponse response = userService.findUserTransactionList(loginUser.getId(),
					statusIds, pageable);

				// then
				assertAll(
					() -> assertThat(response.isHasMore()).isFalse(),
					() -> assertThat(response.getItems().size()).isEqualTo(2)
				);
			})
		);
	}

}
