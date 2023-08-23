package com.codesquad.secondhand.api.controller.region;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.service.region.RegionService;
import com.codesquad.secondhand.api.service.region.response.RegionResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class RegionController {

	private final RegionService regionService;

	public ApiResponse<List<RegionResponse>> listAllRegions() {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.REGION_FETCH_SUCCESS.getMessage(),
			regionService.listAllRegions());
	}

}
