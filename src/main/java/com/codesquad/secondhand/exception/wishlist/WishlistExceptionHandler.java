package com.codesquad.secondhand.exception.wishlist;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.codesquad.secondhand.api.ApiResponse;

@RestControllerAdvice
public class WishlistExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler({DuplicatedWishlistException.class, NoSuchWishlistException.class})
	public ApiResponse<Void> handleWishlistException(RuntimeException exception) {
		return ApiResponse.noData(HttpStatus.BAD_REQUEST, exception.getMessage());
	}

}
