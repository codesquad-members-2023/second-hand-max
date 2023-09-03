package com.codesquad.secondhand.domain.user;

import static org.assertj.core.api.Assertions.*;

import java.util.Collection;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.domain.user_region.UserRegionRepository;
import com.codesquad.secondhand.exception.user_region.DuplicatedUserRegionException;
import com.codesquad.secondhand.exception.user_region.ExceedUserRegionLimitException;
import com.codesquad.secondhand.exception.user_region.MinimumUserRegionViolationException;
import com.codesquad.secondhand.exception.user_region.NoSuchUserRegionException;

class UserTest extends IntegrationTestSupport {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RegionRepository regionRepository;

	@Autowired
	private UserRegionRepository userRegionRepository;

	@BeforeEach
	private void init() {
		userRegionRepository.deleteAllInBatch();
		userRepository.deleteAllInBatch();
		regionRepository.deleteAllInBatch();
	}

	@DisplayName("사용자 동네 등록 시나리오")
	@TestFactory
	Collection<DynamicTest> addUserRegion() {
		// given
		List<Region> regions = FixtureFactory.createRegionFixtures(3);
		regionRepository.saveAll(regions);

		User user = FixtureFactory.createUserFixtureWithRegions(List.of(regions.get(0)));
		userRepository.save(user);

		return List.of(
			DynamicTest.dynamicTest("중복된 동네를 저장하려고 시도하는 경우 예외가 발생한다.", () -> {
				// given
				Region region = regions.get(0);

				// when // then
				assertThatThrownBy(() -> user.addUserRegion(region))
					.isInstanceOf(DuplicatedUserRegionException.class)
					.hasMessage("이미 등록된 동네입니다.");
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
					.hasMessage("동네 등록 수가 최대 제한을 초과했습니다. 동네 등록 요청이 거부되었습니다.");
			})
		);
	}

	@DisplayName("사용자 동네 삭제 시나리오")
	@TestFactory
	Collection<DynamicTest> removeUserRegion() {
		// given
		List<Region> regions = FixtureFactory.createRegionFixtures(3);
		regionRepository.saveAll(regions);

		User user = FixtureFactory.createUserFixtureWithRegions(List.of(regions.get(0), regions.get(1)));
		userRepository.save(user);

		return List.of(
			DynamicTest.dynamicTest("등록하지 않은 사용자 동네를 삭제하려고 시도하는 경우 예외가 발생한다.", () -> {
				// given
				Region region = regions.get(2);

				// when // then
				assertThatThrownBy(() -> user.removeUserRegion(region))
					.isInstanceOf(NoSuchUserRegionException.class)
					.hasMessage("사용자 동네 목록에 없는 동네입니다.");
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
					.hasMessage("최소 1개의 동네는 필수입니다. 동네 삭제 요청이 거부되었습니다.");
			})
		);
	}

}
