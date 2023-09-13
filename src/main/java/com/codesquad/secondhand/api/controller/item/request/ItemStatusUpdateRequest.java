package com.codesquad.secondhand.api.controller.item.request;

import com.codesquad.secondhand.api.service.item.request.ItemStatusUpdateServiceRequest;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ItemStatusUpdateRequest {

	private Long status;

	public ItemStatusUpdateServiceRequest toService(Long id) {
		return new ItemStatusUpdateServiceRequest(id, status);
	}

}
