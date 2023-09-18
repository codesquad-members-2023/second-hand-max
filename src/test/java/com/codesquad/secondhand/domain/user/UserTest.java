package com.codesquad.secondhand.domain.user;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
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
import com.codesquad.secondhand.domain.wishlist.WishlistRepository;
import com.codesquad.secondhand.exception.ErrorResponse;
import com.codesquad.secondhand.exception.user_region.NoSuchUserRegionException;
import com.codesquad.secondhand.exception.wishlist.DuplicatedWishlistException;
import com.codesquad.secondhand.exception.wishlist.NoSuchWishlistException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

public class UserTest extends IntegrationTestSupport {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RegionRepository regionRepository;

	@Autowired
	private ImageRepository imageRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private StatusRepository statusRepository;

	@Autowired
	private ItemRepository itemRepository;

	@Autowired
	private WishlistRepository wishlistRepository;

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
			.hasMessage(ErrorResponse.NO_SUCH_USER_REGION_EXCEPTION.getMessage());
	}

	@DisplayName("사용자 관심 목록 시나리오")
	@TestFactory
	Collection<DynamicTest> wishlist() {
		// given
		List<Region> regions = FixtureFactory.createRegionFixtures(3);
		regionRepository.saveAll(regions);

		User user = FixtureFactory.createUserFixture(List.of(regions.get(0)));
		userRepository.save(user);

		List<Category> categories = FixtureFactory.createCategoryFixtures(3);
		categoryRepository.saveAll(categories);

		List<Status> statuses = FixtureFactory.createStatusFixtures();
		statusRepository.saveAll(statuses);

		Item item1 = FixtureFactory.createItemFixture(user, categories.get(0), regions.get(0), statuses.get(0));
		Item item2 = FixtureFactory.createItemFixture(user, categories.get(1), regions.get(1), statuses.get(1));
		Item item3 = FixtureFactory.createItemFixture(user, categories.get(2), regions.get(2), statuses.get(2));
		List<Item> items = itemRepository.saveAll(List.of(item1, item2, item3));

		return List.of(
			DynamicTest.dynamicTest("관심 목록에 상품을 등록한다.", () -> {
				// when
				user.addWishlist(items.get(0));

				// then
				assertThat(user.getMyWishlist().listAll()).hasSize(1);
			}),
			DynamicTest.dynamicTest("중복된 상품을 관심 목록에 등록하려고 시도하는 경우 예외가 발생한다.", () -> {
				// when & then
				assertThatThrownBy(() -> user.addWishlist(items.get(0)))
					.isInstanceOf(DuplicatedWishlistException.class)
					.hasMessage(ErrorResponse.DUPLICATED_WISHLIST_EXCEPTION.getMessage());
			}),
			DynamicTest.dynamicTest("중복되지 않은 상품을 관심 목록에 등록하는데 성공한다.", () -> {
				// when
				user.addWishlist(items.get(1));

				//then
				assertThat(user.getMyWishlist().listAll()).hasSize(2);
			}),
			DynamicTest.dynamicTest("상품을 관심 목록에서 삭제한다.", () -> {
				// when
				user.removeWishlist(items.get(1));

				//then
				assertThat(user.getMyWishlist().listAll()).hasSize(1);
			}),
			DynamicTest.dynamicTest("관심 목록에 없는 상품을 삭제하려고 시도하는 경우 예외가 발생한다.", () -> {
				// when & then
				assertThatThrownBy(() -> user.removeWishlist(items.get(1)))
					.isInstanceOf(NoSuchWishlistException.class)
					.hasMessage(ErrorResponse.NO_SUCH_WISHLIST_EXCEPTION.getMessage());
			}),
			DynamicTest.dynamicTest("아이템을 삭제하면 관심 목록에서도 삭제된다.", () -> {
				// given
				Pageable pageable = PageRequest.of(0, 20);

				// when
				items.get(0).delete(user.getId());

				//then
				assertThat(wishlistRepository.findSliceByUserId(pageable, user.getId())).isEmpty();
			})
		);
	}

}
