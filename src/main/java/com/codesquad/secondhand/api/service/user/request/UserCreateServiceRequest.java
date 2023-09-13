package com.codesquad.secondhand.api.service.user.request;

import java.util.UUID;

import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.user.MyRegion;
import com.codesquad.secondhand.domain.user.MyWishlist;
import com.codesquad.secondhand.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserCreateServiceRequest {

	private String nickname;
	private String email;
	private String password;
	private Image image;
	private Provider provider;
	private Region region;

	public static UserCreateServiceRequest from(String email, Provider provider, Region region) {
		String nickname = UUID.randomUUID().toString().substring(0, 10);
		return new UserCreateServiceRequest(nickname, email, null, null, provider, region);
	}

	public User toEntity() {
		return new User(null, new MyRegion(), image, provider, new MyWishlist(), nickname, email, password, null);
	}

}
