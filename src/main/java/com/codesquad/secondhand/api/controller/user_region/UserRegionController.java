package com.codesquad.secondhand.api.controller.user_region;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.service.user_region.UserRegionService;
import com.codesquad.secondhand.api.service.user_region.response.UserRegionResponse;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/users/regions")
@RequiredArgsConstructor
@RestController
public class UserRegionController {

	private final UserRegionService userRegionService;

	@GetMapping
	public ApiResponse<List<UserRegionResponse>> listUserRegions() {
		final Long userId = 1L;
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.USER_REGION_FETCH_SUCCESS.getMessage(),
			userRegionService.listUserRegions(userId));
	}

}
