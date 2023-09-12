package com.codesquad.secondhand.domain.user;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Collection;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.image.ImageRepository;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.exception.user_region.NoSuchUserRegionException;

public class UserTest extends IntegrationTestSupport {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RegionRepository regionRepository;

	@Autowired
	private ImageRepository imageRepository;

	@DisplayName("사용자를 등록한다.")
	@Test
	void addUser() {
		// given
		List<Region> regions = FixtureFactory.createRegionFixtures(1);
		regionRepository.saveAll(regions);

		User user = FixtureFactory.createUserFixture(List.of(regions.get(0)));

		// when
		User savedUser = userRepository.save(user);

		// then
		assertAll(
			() -> assertThat(savedUser.getNickname()).isEqualTo(user.getNickname()),
			() -> assertThat(savedUser.getEmail()).isEqualTo(user.getEmail()),
			() -> assertThat(savedUser.getProvider()).isEqualTo(user.getProvider())
		);
	}

	@DisplayName("사용자의 닉네임과 프로필을 수정한다.")
	@Test
	void updateInformation() {
		// given
		List<Region> regions = FixtureFactory.createRegionFixtures(1);
		regionRepository.saveAll(regions);

		User user = FixtureFactory.createUserFixture(List.of(regions.get(0)));
		User savedUser = userRepository.save(user);

		Image image = new Image(null, "https://carrot.jpeg");
		Image savedImage = imageRepository.save(image);

		// when
		savedUser.updateInformation("newNickname", savedImage);

		// then
		assertAll(
			() -> assertThat(user.getNickname()).isEqualTo("newNickname"),
			() -> assertThat(user.getProfile()).isEqualTo(savedImage)
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
					.hasMessage("사용자 동네 목록에 없는 동네입니다");
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

	@DisplayName("사용자의 동네가 아닌 다른 동네에 새로운 상품을 등록하는 경우 예외가 발생한다.")
	@Test
	void postItem() {
		//given
		List<Region> regions = FixtureFactory.createRegionFixtures(3);
		regionRepository.saveAll(regions);
		User seller = FixtureFactory.createUserFixture(List.of(regions.get(0), regions.get(1)));
		userRepository.save(seller);
		Region region = regions.get(2);

		assertThatThrownBy(() -> seller.validateHasRegion(region))
			.isInstanceOf(NoSuchUserRegionException.class)
			.hasMessage("사용자 동네 목록에 없는 동네입니다");
	}

}
