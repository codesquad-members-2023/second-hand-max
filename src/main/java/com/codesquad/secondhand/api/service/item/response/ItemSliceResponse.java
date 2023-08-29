package com.codesquad.secondhand.api.service.item.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ItemSliceResponse {

	private boolean hasMore;
	private List<ItemResponse> items;

}
