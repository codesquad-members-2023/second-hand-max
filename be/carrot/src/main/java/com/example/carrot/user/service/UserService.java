package com.example.carrot.user.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.global.jwt.Jwt;
import com.example.carrot.global.jwt.JwtProvider;
import com.example.carrot.location.entity.Location;
import com.example.carrot.location.service.LocationService;
import com.example.carrot.user.dto.request.SignUpRequestDto;
import com.example.carrot.user.dto.response.LoginUserResponseDto;
import com.example.carrot.user.dto.response.OauthTokenResponseDto;
import com.example.carrot.user.dto.response.UserNicknameResponseDto;
import com.example.carrot.user.dto.response.UserResponseDto;
import com.example.carrot.user.entity.User;
import com.example.carrot.user.repository.UserRepository;
import com.example.carrot.user_location.entity.UserLocation;
import com.example.carrot.user_location.service.UserLocationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

	@Value("${oauth.kakao.client_id}")
	private String clientId;

	@Value("${oauth.kakao.client_secret}")
	private String clientSecret;

	@Value("${oauth.kakao.grant_type}")
	private String grantType;

	@Value("${oauth.kakao.redirect_uri}")
	private String redirectUri;

	private final LocationService locationService;
	private final UserLocationService userLocationService;
	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;

	public UserResponseDto kakaoLogin(String code) {
		OauthTokenResponseDto tokenResponse = getToken(code);
		log.info("access token : " + tokenResponse.getAccessToken());
		log.info("scope : " + tokenResponse.getScope());

		Map<String, Object> userInfo = findUserInfo(tokenResponse.getAccessToken());
		log.info("social id : " + userInfo.get("id"));
		log.info(
			"profile img : " + ((Map)((Map)userInfo.get("kakao_account")).get("profile")).get("thumbnail_image_url"));

		String socialId = String.valueOf(userInfo.get("id"));
		String imgUrl = String.valueOf(
			((Map)((Map)userInfo.get("kakao_account")).get("profile")).get("thumbnail_image_url"));

		Optional<User> user = userRepository.findBySocialId(socialId);

		if (user.isEmpty()) {
			log.info("최초 로그인 유저");
			Jwt jwt = jwtProvider.createJwt(Map.of("imgUrl", imgUrl, "socialId", socialId));
			return UserResponseDto.of(jwt.getAccessToken(), false);
		}

		log.info("로그인 유저");
		User findUser = user.get();
		Jwt jwt = jwtProvider.createJwt(Map.of("userId", findUser.getUserId()));

		return UserResponseDto.of(
			jwt,
			LoginUserResponseDto.of(findUser.getUserId(), findUser.getNickName(), findUser.getImageUrl()),
			true);
	}

	private OauthTokenResponseDto getToken(String code) {
		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
		formData.add("code", code);
		formData.add("client_id", clientId);
		formData.add("grant_type", grantType);
		formData.add("client_secret", clientSecret);
		formData.add("redirect_uri", redirectUri);

		return WebClient.create()
			.post()
			.uri("https://kauth.kakao.com/oauth/token")
			.header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
			.bodyValue(formData)
			.retrieve()
			.bodyToMono(OauthTokenResponseDto.class)
			.block();
	}

	private Map<String, Object> findUserInfo(String accessToken) {
		return WebClient.create()
			.get()
			.uri("https://kapi.kakao.com/v2/user/me")
			.header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
			.header("Authorization", "Bearer " + accessToken)
			.retrieve()
			.bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
			})
			.block();
	}

	@Transactional
	public UserResponseDto kakaoSignUp(SignUpRequestDto signUpRequestDto, String socialId, String imgUrl) {
		User user = userRepository.save(SignUpRequestDto.toEntity(signUpRequestDto.getNickname(), socialId, imgUrl));
		log.info("user id : {}", user.getUserId());
		Location mainLocation = locationService.findLocation(signUpRequestDto.getMainLocationId());
		userLocationService.saveUserLocation(UserLocation.of(user, mainLocation, true));

		if (signUpRequestDto.getSubLocationId() != null) {
			Location subLocation = locationService.findLocation(signUpRequestDto.getSubLocationId());
			userLocationService.saveUserLocation(UserLocation.of(user, subLocation, false));
		}

		Jwt jwt = jwtProvider.createJwt(Map.of("userId", user.getUserId()));

		return UserResponseDto.of(
			jwt,
			LoginUserResponseDto.of(user.getUserId(), user.getNickName(), user.getImageUrl()),
			true);
	}

	@Transactional
	public UserNicknameResponseDto checkNickNameDuplicate(String nickname, Long userId) {
		Jwt jwt = jwtProvider.createJwt(Map.of("userId", userId));

		if (userRepository.existsByNickName(nickname)) {
			return UserNicknameResponseDto.of(jwt.getAccessToken());
		}

		throw new CustomException(StatusCode.ALREADY_EXIST_USER);
	}
}
