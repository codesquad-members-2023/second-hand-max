package com.codesquad.secondhand.application.service.in.image;

import com.codesquad.secondhand.adapter.in.web.response.ImageInfo;
import com.codesquad.secondhand.domain.image.Image;
import java.util.List;
import java.util.stream.Collectors;

public class ImageMapper {

    private ImageMapper() {
        throw new UnsupportedOperationException();
    }

    public static ImageInfo toImageInfo(Image image) {
        return new ImageInfo(image.getId(), image.getUrl());
    }

    public static List<ImageInfo> toImageInfos(List<Image> images) {
        return images.stream()
                .map(ImageMapper::toImageInfo)
                .collect(Collectors.toUnmodifiableList());
    }
}
