package com.codesquad.secondhand.api.controller.wishlist;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.annotation.SignIn;
import com.codesquad.secondhand.annotation.SignInUser;
import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.service.wishlist.WishlistService;
import com.codesquad.secondhand.api.service.wishlist.request.WishlistServiceRequest;
import com.codesquad.secondhand.api.service.wishlist.response.WishlistCategoryResponse;
import com.codesquad.secondhand.api.service.wishlist.response.WishlistSliceResponse;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/users/wishlist")
@RequiredArgsConstructor
@RestController
public class WishlistController {

	private final WishlistService wishlistService;

	@GetMapping
	public ApiResponse<WishlistSliceResponse> listWishlists(@SignIn SignInUser signInUser,
		@RequestParam Long category,
		Pageable pageable) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.WISHLIST_FETCH_SUCCESS.getMessage(),
			wishlistService.listWishlists(new WishlistServiceRequest(signInUser.getId(), category, pageable)));
	}

	@GetMapping("/categories")
	public ApiResponse<WishlistCategoryResponse> listWishlistCategories(@SignIn SignInUser signInUser) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.WISHLIST_CATEGORY_FETCH_SUCCESS.getMessage(),
			wishlistService.listWishlistCategories(signInUser.getId()));
	}

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/{itemId}")
	public ApiResponse<Void> createWishlist(@PathVariable Long itemId, @SignIn SignInUser signInUser) {
		wishlistService.createWishlist(signInUser.getId(), itemId);
		return ApiResponse.noData(HttpStatus.CREATED, ResponseMessage.WISHLIST_CREATE_SUCCESS.getMessage());
	}

	@DeleteMapping("/{itemId}")
	public ApiResponse<Void> deleteWishlist(@PathVariable Long itemId, @SignIn SignInUser signInUser) {
		wishlistService.deleteWishlist(signInUser.getId(), itemId);
		return ApiResponse.noData(HttpStatus.OK, ResponseMessage.WISHLIST_DELETE_SUCCESS.getMessage());
	}

}
