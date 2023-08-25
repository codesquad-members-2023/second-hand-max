package com.codesquad.secondhand.api.controller.user_region.request;

import com.codesquad.secondhand.api.service.user_region.request.UserRegionCreateServiceRequest;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserRegionCreateRequest {

	private Long id;

	public UserRegionCreateServiceRequest toService(Long userId) {
		return new UserRegionCreateServiceRequest(userId, this.id);
	}

}
