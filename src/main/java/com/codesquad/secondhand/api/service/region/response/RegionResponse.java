package com.codesquad.secondhand.api.service.region.response;

import com.codesquad.secondhand.domain.region.Region;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class RegionResponse {

	private Long id;
	private String title;

	public static RegionResponse from(Region region) {
		return new RegionResponse(region.getId(), region.getTitle());
	}

}

