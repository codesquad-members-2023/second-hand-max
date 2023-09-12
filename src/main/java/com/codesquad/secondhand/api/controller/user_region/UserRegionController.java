package com.codesquad.secondhand.api.controller.user_region;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.codesquad.secondhand.annotation.SignIn;
import com.codesquad.secondhand.annotation.SignInUser;
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
	public ApiResponse<List<UserRegionResponse>> listUserRegions(@SignIn SignInUser signInUser) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.USER_REGION_FETCH_SUCCESS.getMessage(),
			userRegionService.listUserRegions(signInUser.getId()));
	}

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping()
	public ApiResponse<Void> createUserRegion(@RequestBody UserRegionCreateRequest request,
		@SignIn SignInUser signInUser) {
		userRegionService.createUserRegion(request.toService(signInUser.getId()));
		return ApiResponse.noData(HttpStatus.CREATED, ResponseMessage.USER_REGION_CREATE_SUCCESS.getMessage());
	}

	@PatchMapping("/{id}")
	public ApiResponse<Void> selectUserRegion(@PathVariable Long id, @SignIn SignInUser signInUser) {
		userRegionService.selectUserRegion(signInUser.getId(), id);
		return ApiResponse.noData(HttpStatus.OK, ResponseMessage.USER_REGION_SELECT_SUCCESS.getMessage());
	}

	@DeleteMapping("/{id}")
	public ApiResponse<Void> deleteUserRegion(@PathVariable Long id, @SignIn SignInUser signInUser) {
		userRegionService.deleteUserRegion(signInUser.getId(), id);
		return ApiResponse.noData(HttpStatus.OK, ResponseMessage.USER_REGION_DELETE_SUCCESS.getMessage());
	}

}
