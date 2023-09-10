package com.codesquad.secondhand.api.controller.item.request;

import java.util.List;

import com.codesquad.secondhand.api.service.item.request.ItemPostingServiceRequest;
import com.codesquad.secondhand.domain.image.Image;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ItemPostingRequest {

	private String title;
	private Integer price;
	private String content;
	private List<Long> imageIds;
	private Long categoryId;
	private Long regionId;

	public ItemPostingServiceRequest toService(List<Image> images) {
		return new ItemPostingServiceRequest(title, price, content, images, categoryId, regionId);
	}

}
