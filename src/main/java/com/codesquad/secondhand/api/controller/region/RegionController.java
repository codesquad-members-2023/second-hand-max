package com.codesquad.secondhand.api.controller.region;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.service.region.RegionService;
import com.codesquad.secondhand.api.service.region.response.RegionResponse;

import lombok.RequiredArgsConstructor;

@RequestMapping(path = "/api/regions")
@RequiredArgsConstructor
@RestController
public class RegionController {

	private final RegionService regionService;

	@GetMapping
	public ApiResponse<List<RegionResponse>> listAllRegions(@RequestParam int page) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.REGION_FETCH_SUCCESS.getMessage(),
			regionService.listAllRegions());
	}

}
