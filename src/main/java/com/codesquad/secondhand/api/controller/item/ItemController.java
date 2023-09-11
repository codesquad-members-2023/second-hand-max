package com.codesquad.secondhand.api.controller.item;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.annotation.SignIn;
import com.codesquad.secondhand.annotation.SignInUser;
import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.controller.item.request.ItemPostingRequest;
import com.codesquad.secondhand.api.controller.item.response.ItemDetailResponse;
import com.codesquad.secondhand.api.service.image.ImageService;
import com.codesquad.secondhand.api.service.item.ItemService;
import com.codesquad.secondhand.api.service.item.response.ItemSliceResponse;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/items")
@RequiredArgsConstructor
@RestController
public class ItemController {

	private final ItemService itemService;
	private final ImageService imageService;

	@ResponseStatus(HttpStatus.OK)
	@GetMapping
	public ApiResponse<ItemSliceResponse> listFilteredItems(Pageable pageable,
		@RequestParam Long category, @RequestParam Long region) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.ITEM_FETCH_SUCCESS.getMessage(),
			itemService.listOfItems(category, region, pageable));
	}

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping
	public ApiResponse<Void> postItem(@RequestBody ItemPostingRequest request, @SignIn SignInUser signInUser) {
		itemService.postItem(request.toService(imageService.findImagesByIds(request.getImageIds())),
			signInUser.getId());
		return ApiResponse.noData(HttpStatus.CREATED, ResponseMessage.ITEM_POST_SUCCESS.getMessage());
	}

	@GetMapping("/{id}")
	public ApiResponse<ItemDetailResponse> getItemDetail(@PathVariable Long id, @SignIn SignInUser signInUser) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.ITEM_DETAIL_FETCH_SUCCESS.getMessage(),
			itemService.getItemDetail(id, signInUser.getId()));
	}

}
