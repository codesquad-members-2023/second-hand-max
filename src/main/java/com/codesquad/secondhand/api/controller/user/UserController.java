package com.codesquad.secondhand.api.controller.user;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.codesquad.secondhand.annotation.SignIn;
import com.codesquad.secondhand.annotation.SignInUser;
import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.controller.user.request.UserCreateRequest;
import com.codesquad.secondhand.api.controller.user.request.UserUpdateRequest;
import com.codesquad.secondhand.api.controller.user.response.UserInformationResponse;
import com.codesquad.secondhand.api.service.image.ImageService;
import com.codesquad.secondhand.api.service.user.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/users")
@RequiredArgsConstructor
@RestController
public class UserController {

	public static final String USER_IMAGE_DIRECTORY = "user";

	private final UserService userService;
	private final ImageService imageService;

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping()
	public ApiResponse<Void> createLocalUser(@RequestPart(required = false) MultipartFile image,
		@Valid @RequestPart UserCreateRequest request) {
		userService.createLocalUser(
			request.toService(image == null ? null : imageService.createImage(image, USER_IMAGE_DIRECTORY)));
		return ApiResponse.noData(HttpStatus.CREATED, ResponseMessage.USER_CREATE_SUCCESS.getMessage());
	}

	@GetMapping("/info")
	public ApiResponse<UserInformationResponse> showUserInformation(@SignIn SignInUser signInUser) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.USER_INFORMATION_FETCH_SUCCESS.getMessage(),
			userService.showUserInformation(signInUser.getId()));
	}

	@PatchMapping("/info")
	public ApiResponse<Void> updateUserInformation(@RequestPart(required = false) MultipartFile image,
		@Valid @RequestPart UserUpdateRequest request, @SignIn SignInUser signInUser) {
		userService.updateUserInformation(signInUser.getId(),
			request.toService(image.isEmpty() ? null : imageService.createImage(image, USER_IMAGE_DIRECTORY)));
		return ApiResponse.noData(HttpStatus.OK, ResponseMessage.USER_INFORMATION_UPDATE_SUCCESS.getMessage());
	}

}
