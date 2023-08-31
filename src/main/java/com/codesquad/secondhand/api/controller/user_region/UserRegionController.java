package com.codesquad.secondhand.api.controller.user_region;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.controller.user_region.request.UserRegionCreateRequest;
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

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping()
	public ApiResponse<Void> createUserRegion(@RequestBody UserRegionCreateRequest request) {
		final Long userId = 1L;
		userRegionService.createUserRegion(request.toService(userId));
		return ApiResponse.of(HttpStatus.CREATED, ResponseMessage.USER_REGION_CREATE_SUCCESS.getMessage(), null);
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@DeleteMapping("/{id}")
	public ApiResponse<Void> deleteUserRegion(@PathVariable Long id) {
		final Long userId = 1L;
		userRegionService.deleteUserRegion(userId, id);
		return ApiResponse.of(HttpStatus.NO_CONTENT, ResponseMessage.USER_REGION_DELETE_SUCCESS.getMessage(), null);
	}

}
