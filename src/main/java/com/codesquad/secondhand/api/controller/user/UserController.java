package com.codesquad.secondhand.api.controller.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.controller.user.request.UserCreateRequest;
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
	public ApiResponse<Void> createLocalUser(@RequestPart(required = false) MultipartFile file,
		@RequestPart UserCreateRequest request) {
		userService.createLocalUser(
			request.toService(file == null ? null : imageService.createImage(file, USER_IMAGE_DIRECTORY)));
		return ApiResponse.noData(HttpStatus.CREATED, ResponseMessage.USER_CREATE_SUCCESS.getMessage());
	}

}
