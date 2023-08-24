package com.codesquad.secondhand.api.service.user_region.response;

import com.codesquad.secondhand.domain.user_region.UserRegion;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserRegionResponse {

	private Long id;
	private String title;

	public static UserRegionResponse from(UserRegion userRegion) {
		return new UserRegionResponse(userRegion.getRegionId(), userRegion.getRegionTitle());
	}

}
