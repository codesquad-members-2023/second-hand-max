package com.codesquad.secondhand.api.controller.item.request;

import java.util.List;

import com.codesquad.secondhand.api.service.item.request.ItemUpdateServiceRequest;
import com.codesquad.secondhand.domain.image.Image;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ItemUpdateRequest {

	private String title;
	private Integer price;
	private String content;
	private List<Long> imageIds;
	private Long categoryId;
	private Long regionId;

	public ItemUpdateServiceRequest toService(Long id, List<Image> images) {
		return new ItemUpdateServiceRequest(id, title, price, content, images, categoryId, regionId);
	}
}
