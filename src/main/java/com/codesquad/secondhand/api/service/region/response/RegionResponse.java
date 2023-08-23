package com.codesquad.secondhand.api.service.region.response;

import com.codesquad.secondhand.domain.region.Region;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class RegionResponse {

	private Long id;
	private String title;

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public static RegionResponse from(Region region) {
		return new RegionResponse(region.getId(), region.getTitle());
	}

}
