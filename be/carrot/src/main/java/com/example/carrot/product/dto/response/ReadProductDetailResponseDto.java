package com.example.carrot.product.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ReadProductDetailResponseDto {

	@JsonProperty("images")
	private List<ProductImageResponseDto> images;
	@JsonProperty("seller")
	private ProductDetailSellerResponseDto seller;
	@JsonProperty("product")
	private ProductDetailResponseDto product;

	public static ReadProductDetailResponseDto of(List<ProductImageResponseDto> images, ProductDetailSellerResponseDto seller,
		ProductDetailResponseDto product) {
		return new ReadProductDetailResponseDto(images, seller, product);
	}

}
