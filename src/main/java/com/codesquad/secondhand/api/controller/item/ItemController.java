package com.codesquad.secondhand.api.controller.item;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.service.item.ItemService;
import com.codesquad.secondhand.api.service.item.response.ItemSliceResponse;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/items")
@RequiredArgsConstructor
@RestController
public class ItemController {

	private final ItemService itemService;

	@GetMapping
	public ApiResponse<ItemSliceResponse> listFilteredItems(
		@RequestParam Long category,
		@RequestParam Long region,
		@RequestParam int cursor
	) {
		return ApiResponse.of(HttpStatus.OK, "상품 목록 조회를 성공하였습니다.", itemService.listOfItems(category, region, cursor));
	}

}
