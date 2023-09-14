package com.codesquad.secondhand.api.service.item.request;

import java.time.LocalDateTime;
import java.util.List;

import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.status.Status;
import com.codesquad.secondhand.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ItemPostServiceRequest {

	private String title;
	private Integer price;
	private String content;
	private List<Image> images;
	private Long categoryId;
	private Long regionId;

	public Item toEntity(User user, Category category, Region region, Status status) {
		return new Item(
			user,
			category,
			region,
			status,
			LocalDateTime.now(),
			this.title,
			this.content,
			this.price
		);
	}

}
