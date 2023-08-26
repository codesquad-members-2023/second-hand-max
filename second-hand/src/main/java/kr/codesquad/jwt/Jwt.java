package kr.codesquad.jwt;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Jwt {
	private final String accessToken;
	private final String refreshToken;
}
