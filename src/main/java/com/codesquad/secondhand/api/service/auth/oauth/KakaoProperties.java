package com.codesquad.secondhand.api.service.auth.oauth;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
@ConfigurationProperties("security.oauth.kakao")
public class KakaoProperties {

	private String clientId;
	private String clientSecret;
	private String accessTokenUrl;
	private String userInformationUrl;
	private String redirectUri;

}
