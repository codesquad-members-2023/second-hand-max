package com.codesquad.secondhand.config.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import com.codesquad.secondhand.api.service.auth.jwt.JwtService;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class SignInInterceptor implements HandlerInterceptor {

	private static final String AUTHORIZATION_HEADER = "Authorization";

	private final JwtService jwtService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		if (CorsUtils.isPreFlightRequest(request)) {
			return true;
		}

		if (request.getMethod().equals(HttpMethod.POST.name()) && request.getServletPath().contains("/api/auth")) {
			return true;
		}

		if (request.getMethod().equals(HttpMethod.POST.name()) && request.getRequestURI().contains("/api/users")) {
			return true;
		}

		String accessToken = request.getHeader(AUTHORIZATION_HEADER);
		Claims claims = jwtService.parse(accessToken);

		request.setAttribute("id", claims.get("id", Long.class));
		return true;
	}

}
