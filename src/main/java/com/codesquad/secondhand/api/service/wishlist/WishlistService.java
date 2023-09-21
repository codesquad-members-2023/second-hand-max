package com.codesquad.secondhand.api.service.wishlist;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.service.wishlist.request.WishlistServiceRequest;
import com.codesquad.secondhand.api.service.wishlist.response.WishlistCategory;
import com.codesquad.secondhand.api.service.wishlist.response.WishlistCategoryResponse;
import com.codesquad.secondhand.api.service.wishlist.response.WishlistResponse;
import com.codesquad.secondhand.api.service.wishlist.response.WishlistSliceResponse;
import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.item.ItemRepository;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.domain.wishlist.QueryWishlistRepository;
import com.codesquad.secondhand.domain.wishlist.Wishlist;
import com.codesquad.secondhand.domain.wishlist.WishlistRepository;
import com.codesquad.secondhand.exception.item.NoSuchItemException;
import com.codesquad.secondhand.exception.user.NoSuchUserException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class WishlistService {

	private final UserRepository userRepository;
	private final ItemRepository itemRepository;
	private final WishlistRepository wishlistRepository;
	private final QueryWishlistRepository queryWishlistRepository;

	@Transactional(readOnly = true)
	public WishlistSliceResponse listWishlists(WishlistServiceRequest request) {
		Slice<Wishlist> items = queryWishlistRepository.filteredByUserIdAndCategoryId(
			request.getUserId(), request.getCategory(), request.getPageable());

		return new WishlistSliceResponse(items.hasNext(), items
			.stream()
			.map(WishlistResponse::from)
			.collect(Collectors.toUnmodifiableList()));
	}

	@Transactional
	public void createWishlist(Long userId, Long itemId) {
		User user = userRepository.findCompleteUserById(userId).orElseThrow(NoSuchUserException::new);
		Item item = itemRepository.findById(itemId).orElseThrow(NoSuchItemException::new);
		user.addWishlist(item);
	}

	@Transactional
	public void deleteWishlist(Long userId, Long itemId) {
		User user = userRepository.findCompleteUserById(userId).orElseThrow(NoSuchUserException::new);
		Item item = itemRepository.findById(itemId).orElseThrow(NoSuchItemException::new);
		user.removeWishlist(item);
	}

	public WishlistCategoryResponse listWishlistCategories(Long userId) {
		List<WishlistCategory> categories = wishlistRepository.findWishlistCategoryByUserId(userId).stream()
			.map(wishlist -> wishlist.getItem().getCategory())
			.map(WishlistCategory::from)
			.collect(Collectors.toUnmodifiableList());

		return new WishlistCategoryResponse(categories);
	}
	
}
