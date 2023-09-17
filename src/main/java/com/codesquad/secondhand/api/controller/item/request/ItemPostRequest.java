package com.codesquad.secondhand.api.controller.item.request;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import com.codesquad.secondhand.api.service.item.request.ItemPostServiceRequest;
import com.codesquad.secondhand.domain.image.Image;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ItemPostRequest {

	@NotBlank(message = "제목은 공백일 수 없습니다")
	@Length(max = 60, message = "제목은 최대 60자 입니다")
	private String title;

	private Integer price;

	@NotBlank(message = "내용은 공백일 수 없습니다")
	@Length(max = 3000, message = "내용은 최대 3000자 입니다")
	private String content;

	@Size(max = 10, message = "상품 이미지는 최대 10개까지 등록할 수 있습니다")
	private List<Long> imageIds;

	@NotNull(message = "상품 카테고리가 선택되지 않았습니다")
	private Long categoryId;

	@NotNull(message = "지역이 선택되지 않았습니다")
	private Long regionId;

	public ItemPostServiceRequest toService(List<Image> images) {
		return new ItemPostServiceRequest(title, price, content, images, categoryId, regionId);
	}

}
