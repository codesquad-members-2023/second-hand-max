package com.codesquad.secondhand.util;

import java.util.Map;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public abstract class MultiValueMapConverter {

	public static MultiValueMap<String, String> convert(ObjectMapper objectMapper, Object dto) {
		try {
			MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
			Map<String, String> map = objectMapper.convertValue(dto, new TypeReference<Map<String, String>>() {
			});
			params.setAll(map);

			return params;
		} catch (Exception e) {
			throw new IllegalStateException("MultiValueMap 변환 중 오류가 발생했습니다.");
		}
	}

}
