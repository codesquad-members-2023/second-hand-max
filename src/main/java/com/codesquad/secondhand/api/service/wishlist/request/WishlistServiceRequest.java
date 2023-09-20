package com.codesquad.secondhand.api.service.wishlist.request;

import org.springframework.data.domain.Pageable;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class WishlistServiceRequest {

	private final Long userId;
	private final Long category;
	private final Pageable pageable;

}
