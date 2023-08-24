package com.codesquad.secondhand.api.service.region.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class RegionSliceResponse {

	private boolean hasMore;
	private List<RegionResponse> regions;

}
