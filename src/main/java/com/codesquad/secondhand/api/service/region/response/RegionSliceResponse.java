package com.codesquad.secondhand.api.service.region.response;

import java.util.List;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class RegionSliceResponse {

	private boolean hasMore;
	private List<RegionResponse> regions;

	public boolean isHasMore() {
		return hasMore;
	}

	public List<RegionResponse> getRegions() {
		return regions;
	}

}
