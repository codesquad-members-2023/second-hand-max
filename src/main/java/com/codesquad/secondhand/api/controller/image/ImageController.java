package com.codesquad.secondhand.api.controller.image;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.codesquad.secondhand.api.ApiResponse;
import com.codesquad.secondhand.api.ResponseMessage;
import com.codesquad.secondhand.api.controller.image.request.ImageRequest;
import com.codesquad.secondhand.api.controller.image.response.ImageResponse;
import com.codesquad.secondhand.api.service.image.ImageService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/images")
@RequiredArgsConstructor
@RestController
public class ImageController {

	private final ImageService imageService;

	@PostMapping
	public ApiResponse<ImageResponse> saveImage(@RequestPart MultipartFile image, @RequestPart ImageRequest request) {
		return ApiResponse.of(HttpStatus.OK, ResponseMessage.IMAGE_CREATE_SUCCESS.getMessage(),
			ImageResponse.of(imageService.createImage(image, request.getType())));
	}

}
