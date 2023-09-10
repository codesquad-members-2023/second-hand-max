package com.codesquad.secondhand.domain.image;

import org.springframework.util.StringUtils;

import com.codesquad.secondhand.exception.image.InvalidExtensionException;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ImageExtension {

	GIF("gif"), JPEG("jpeg"), PNG("png");

	private final String type;

	public static ImageExtension getImageExtension(String contentType) {
		if (StringUtils.hasText(contentType)) {
			if (contentType.contains(GIF.type)) {
				return GIF;
			} else if (contentType.contains(JPEG.type)) {
				return JPEG;
			} else if (contentType.contains(PNG.type)) {
				return PNG;
			}
		}
		throw new InvalidExtensionException();
	}

}
