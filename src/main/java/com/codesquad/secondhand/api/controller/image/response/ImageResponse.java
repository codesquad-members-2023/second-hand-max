package com.codesquad.secondhand.api.controller.image.response;

import com.codesquad.secondhand.domain.image.Image;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ImageResponse {

	private Long id;
	private String imageUrl;

	public static ImageResponse of(Image image) {
		return new ImageResponse(image.getId(), image.getImageUrl());
	}

}
