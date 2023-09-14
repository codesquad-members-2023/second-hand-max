package com.codesquad.secondhand.api.controller.item;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.annotation.SignIn;
import com.codesquad.secondhand.annotation.SignInUser;
import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.controller.item.request.ItemPostRequest;
import com.codesquad.secondhand.api.controller.item.request.ItemStatusUpdateRequest;
import com.codesquad.secondhand.api.controller.item.request.ItemUpdateRequest;
import com.codesquad.secondhand.api.controller.item.response.ItemDetailResponse;
import com.codesquad.secondhand.api.service.image.ImageService;
import com.codesquad.secondhand.api.service.item.ItemService;
import com.codesquad.secondhand.api.service.item.response.ItemSliceResponse;
import com.codesquad.secondhand.api.service.item.response.ItemStatusUpdateResponse;
import com.codesquad.secondhand.api.service.item.response.ItemUpdateResponse;

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
			itemService.findFilteredItemList(category, region, pageable));
	}

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping
	public ApiResponse<Void> postItem(@RequestBody ItemPostRequest request, @SignIn SignInUser signInUser) {
		itemService.postItem(request.toService(imageService.findImagesByIds(request.getImageIds())),
			signInUser.getId());
		return ApiResponse.noData(HttpStatus.CREATED, ResponseMessage.ITEM_POST_SUCCESS.getMessage());
	}

	@ResponseStatus(HttpStatus.OK)
	@GetMapping("/{id}")
	public ApiResponse<ItemDetailResponse> getItemDetail(@PathVariable Long id, @SignIn SignInUser signInUser) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.ITEM_DETAIL_FETCH_SUCCESS.getMessage(),
			itemService.getItemDetail(id, signInUser.getId()));
	}

	@ResponseStatus(HttpStatus.OK)
	@DeleteMapping("/{id}")
	public ApiResponse<Void> deleteItem(@PathVariable Long id, @SignIn SignInUser signInUser) {
		itemService.deleteItem(id, signInUser.getId());
		return ApiResponse.noData(HttpStatus.OK, ResponseMessage.ITEM_DELETE_SUCCESS.getMessage());
	}

	@ResponseStatus(HttpStatus.OK)
	@PutMapping("/{id}")
	public ApiResponse<ItemUpdateResponse> updateItem(@PathVariable Long id, @RequestBody ItemUpdateRequest request,
		@SignIn SignInUser signInUser) {
		ItemUpdateResponse response = itemService.updateItem(
			request.toService(id, imageService.findImagesByIds(request.getImageIds())), signInUser.getId());
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.ITEM_UPDATE_SUCCESS.getMessage(), response);
	}

	@ResponseStatus(HttpStatus.OK)
	@PatchMapping("/{id}")
	public ApiResponse<ItemStatusUpdateResponse> updateItemState(@PathVariable Long id,
		@RequestBody ItemStatusUpdateRequest request, @SignIn SignInUser signInUser) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.ITEM_STATUS_UPDATE_SUCCESS.getMessage(),
			itemService.updateItemStatus(request.toService(id), signInUser.getId()));
	}

}
