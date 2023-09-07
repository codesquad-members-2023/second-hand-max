package com.codesquad.secondhand.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.codesquad.secondhand.annotation.SignInUserArgumentResolver;
import com.codesquad.secondhand.config.interceptor.SignInInterceptor;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {

	private final SignInInterceptor signInInterceptor;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("*")
			.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS");
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(signInInterceptor)
			.addPathPatterns("/**")
			.excludePathPatterns("/api/auth/oauth/kakao")
			.excludePathPatterns("/api/auth/refresh");
	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(new SignInUserArgumentResolver());
		WebMvcConfigurer.super.addArgumentResolvers(resolvers);
	}

}
