package com.codesquad.secondhand.api.service.user_region.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserRegionCreateServiceRequest {

	private Long userId;

	private Long regionId;

}
