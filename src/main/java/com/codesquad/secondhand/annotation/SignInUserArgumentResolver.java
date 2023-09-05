package com.codesquad.secondhand.annotation;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class SignInUserArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		boolean hasSignInAnnotation = parameter.hasParameterAnnotation(SignIn.class);
		boolean hasUserType = SignInUser.class.isAssignableFrom(parameter.getParameterType());

		return hasSignInAnnotation && hasUserType;
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
		NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
		HttpServletRequest request = (HttpServletRequest)webRequest.getNativeRequest();
		return new SignInUser(
			(Long)request.getAttribute("id")
		);
	}

}
