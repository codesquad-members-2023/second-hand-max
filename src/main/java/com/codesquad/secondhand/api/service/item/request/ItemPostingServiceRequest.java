package com.codesquad.secondhand.api.service.item.request;

import java.util.List;

import com.codesquad.secondhand.domain.image.Image;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ItemPostingServiceRequest {

	private String title;
	private Integer price;
	private String content;
	private List<Image> images;
	private Long categoryId;
	private Long regionId;

}
