package com.codesquad.secondhand.api.controller.item.response;

import com.codesquad.secondhand.domain.item.Item;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ItemPostResponse {

	private Long id;

	public static ItemPostResponse from(Item item) {
		return new ItemPostResponse(item.getId());
	}

}
