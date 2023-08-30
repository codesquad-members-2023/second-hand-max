package com.example.carrot.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.global.common.ApiResponse;
import com.example.carrot.user.dto.response.LoginResponseDto;
import com.example.carrot.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

	private final UserService userService;

	@GetMapping("/users/login")
	public ApiResponse<LoginResponseDto> kakaoLogin(@RequestParam String code) {
		LoginResponseDto loginResponseDto = userService.kakaoLogin(code);
		return ApiResponse.success(true, loginResponseDto);
	}
}
