package com.codesquad.secondhand.api.controller.item;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.service.item.ItemService;
import com.codesquad.secondhand.api.service.item.response.ItemSliceResponse;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/items")
@RequiredArgsConstructor
@RestController
public class ItemController {

	private final ItemService itemService;

	@GetMapping
	public ApiResponse<ItemSliceResponse> listFilteredItems(Pageable pageable,
		@RequestParam Long category, @RequestParam Long region) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.ITEM_FETCH_SUCCESS.getMessage(),
			itemService.listOfItems(category, region, pageable));
	}

}
