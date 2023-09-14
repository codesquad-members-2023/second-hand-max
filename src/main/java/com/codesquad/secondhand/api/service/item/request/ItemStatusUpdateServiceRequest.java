package com.codesquad.secondhand.api.service.item.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ItemStatusUpdateServiceRequest {

	private Long itemId;
	private Long status;

}
