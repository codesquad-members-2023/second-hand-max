package com.codesquad.secondhand.api.service.wishlist;

import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.service.wishlist.response.WishlistResponse;
import com.codesquad.secondhand.api.service.wishlist.response.WishlistSliceResponse;
import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.item.ItemRepository;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.domain.wishlist.Wishlist;
import com.codesquad.secondhand.domain.wishlist.WishlistRepository;
import com.codesquad.secondhand.exception.item.NoSuchItemException;
import com.codesquad.secondhand.exception.user.NoSuchUserException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class WishlistService {

	private final WishlistRepository wishlistRepository;
	private final UserRepository userRepository;
	private final ItemRepository itemRepository;

	@Transactional(readOnly = true)
	public WishlistSliceResponse listWishlists(Long userId, Pageable pageable) {
		Slice<Wishlist> items = wishlistRepository.findSliceByUserId(pageable, userId);

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

}
