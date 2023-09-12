package com.codesquad.secondhand.api.controller.image;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.codesquad.secondhand.api.controller.image.request.ImageRequest;
import com.codesquad.secondhand.api.service.image.ImageService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/images")
@RequiredArgsConstructor
@RestController
public class ImageController {

	private final ImageService imageService;

	@PostMapping
	public void saveImage(@RequestPart MultipartFile image, @RequestPart ImageRequest request) {
		imageService.createImage(image, request.getType());
	}
}
