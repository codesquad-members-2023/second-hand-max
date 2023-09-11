package com.codesquad.secondhand.domain.user;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Collection;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.image.ImageRepository;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.exception.user_region.DuplicatedUserRegionException;
import com.codesquad.secondhand.exception.user_region.ExceedUserRegionLimitException;
import com.codesquad.secondhand.exception.user_region.MinimumUserRegionViolationException;
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
	void updateNickname() {
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

	@DisplayName("새로운 상품 등록 시나리오")
	@TestFactory
	Collection<DynamicTest> postItem() {
		//given
		List<Region> regions = FixtureFactory.createRegionFixtures(3);
		regionRepository.saveAll(regions);
		User seller = FixtureFactory.createUserFixtureWithRegions(List.of(regions.get(0), regions.get(1)));
		userRepository.save(seller);

		return List.of(
			DynamicTest.dynamicTest("사용자의 동네가 아닌 다른 동네에 새로운 상품을 등록하는 경우 예외가 발생한다.", () -> {
				//given
				Region region = regions.get(2);

				//when & then
				assertThatThrownBy(() -> seller.validateHasRegion(region))
					.isInstanceOf(NoSuchUserRegionException.class)
					.hasMessage("사용자 동네 목록에 없는 동네입니다");
			})
		);
	}

}
