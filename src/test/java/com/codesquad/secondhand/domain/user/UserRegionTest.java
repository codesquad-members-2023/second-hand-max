package com.codesquad.secondhand.domain.user;

import static org.assertj.core.api.Assertions.*;

import java.util.Collection;
import java.util.List;

import com.codesquad.secondhand.exception.ErrorResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.exception.user_region.DuplicatedUserRegionException;
import com.codesquad.secondhand.exception.user_region.ExceedUserRegionLimitException;
import com.codesquad.secondhand.exception.user_region.MinimumUserRegionViolationException;
import com.codesquad.secondhand.exception.user_region.NoSuchUserRegionException;

class UserRegionTest extends IntegrationTestSupport {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RegionRepository regionRepository;

	@DisplayName("사용자 동네 등록 시나리오")
	@TestFactory
	Collection<DynamicTest> addUserRegion() {
		// given
		List<Region> regions = FixtureFactory.createRegionFixtures(3);
		regionRepository.saveAll(regions);

		User user = FixtureFactory.createUserFixture(List.of(regions.get(0)));
		userRepository.save(user);

		return List.of(
			DynamicTest.dynamicTest("중복된 동네를 저장하려고 시도하는 경우 예외가 발생한다.", () -> {
				// given
				Region region = regions.get(0);

				// when // then
				assertThatThrownBy(() -> user.addUserRegion(region))
					.isInstanceOf(DuplicatedUserRegionException.class)
					.hasMessage(ErrorResponse.DUPLICATED_USER_REGION_EXCEPTION.getMessage());
			}),
			DynamicTest.dynamicTest("사용자 동네를 추가할 수 있다.", () -> {
				// given
				Region region = regions.get(1);

				// when
				user.addUserRegion(region);

				// then
				assertThat(user.listUserRegion()).hasSize(2);
			}),
			DynamicTest.dynamicTest("최대 등록 수를 초과하여 등록하려고 시도하는 경우 예외가 발생한다.", () -> {
				// given
				Region region = regions.get(2);

				// when // then
				assertThatThrownBy(() -> user.addUserRegion(region))
					.isInstanceOf(ExceedUserRegionLimitException.class)
					.hasMessage(ErrorResponse.EXCEED_USER_REGION_LIMIT_EXCEPTION.getMessage());
			})
		);
	}

	@DisplayName("사용자 동네 삭제 시나리오")
	@TestFactory
	Collection<DynamicTest> removeUserRegion() {
		// given
		List<Region> regions = FixtureFactory.createRegionFixtures(3);
		regionRepository.saveAll(regions);

		User user = FixtureFactory.createUserFixture(List.of(regions.get(0), regions.get(1)));
		userRepository.save(user);

		return List.of(
			DynamicTest.dynamicTest("등록하지 않은 사용자 동네를 삭제하려고 시도하는 경우 예외가 발생한다.", () -> {
				// given
				Region region = regions.get(2);

				// when // then
				assertThatThrownBy(() -> user.removeUserRegion(region))
					.isInstanceOf(NoSuchUserRegionException.class)
					.hasMessage(ErrorResponse.NO_SUCH_USER_REGION_EXCEPTION.getMessage());
			}),
			DynamicTest.dynamicTest("사용자 동네를 삭제할 수 있다.", () -> {
				// given
				Region region = regions.get(1);

				// when
				user.removeUserRegion(region);

				// then
				assertThat(user.listUserRegion()).hasSize(1);
			}),
			DynamicTest.dynamicTest("사용자 동네 수가 1개일 때 삭제하려고 시도하는 경우 예외가 발생한다.", () -> {
				// given
				Region region = regions.get(0);

				// when // then
				assertThatThrownBy(() -> user.removeUserRegion(region))
					.isInstanceOf(MinimumUserRegionViolationException.class)
					.hasMessage(ErrorResponse.MINIMUM_USER_REGION_VIOLATION_EXCEPTION.getMessage());
			})
		);
	}

	@DisplayName("사용자 동네 선택 시나리오")
	@TestFactory
	Collection<DynamicTest> updateSelectedRegion() {
		// given
		List<Region> regions = FixtureFactory.createRegionFixtures(2);
		regionRepository.saveAll(regions);

		User user = FixtureFactory.createUserFixture(List.of(regions.get(0)));
		User savedUser = userRepository.save(user);

		return List.of(
			DynamicTest.dynamicTest("사용자 등록 시 기본 동네를 자동으로 선택한다.", () -> {
				// when & then
				assertThat(savedUser.getSelectedRegion()).isEqualTo(regions.get(0));
			}),
			DynamicTest.dynamicTest("사용자 동네에 없는 동네를 선택하려고 시도하는 경우 에러가 발생한다.", () -> {
				// when & then
				assertThatThrownBy(() -> savedUser.updateSelectedRegion(regions.get(1)))
					.isInstanceOf(NoSuchUserRegionException.class)
					.hasMessage(ErrorResponse.NO_SUCH_USER_REGION_EXCEPTION.getMessage());
			}),
			DynamicTest.dynamicTest("사용자 목록에 있는 동네를 선택할 수 있다.", () -> {
				// given
				user.addUserRegion(regions.get(1));

				// when
				savedUser.updateSelectedRegion(regions.get(1));

				//then
				assertThat(savedUser.getSelectedRegion()).isEqualTo(regions.get(1));
			})
		);
	}

}
