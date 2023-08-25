package com.codesquad.secondhand.api.service.user_region;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.service.user_region.response.UserRegionResponse;
import com.codesquad.secondhand.domain.user_region.UserRegionRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserRegionService {

	private final UserRegionRepository userRegionRepository;

	@Transactional(readOnly = true)
	public List<UserRegionResponse> listUserRegions(Long userId) {
		return userRegionRepository.findByUserId(userId)
			.stream()
			.map(UserRegionResponse::from)
			.collect(Collectors.toUnmodifiableList());
	}

	@Transactional
	public void deleteUserRegion(Long userId, Long regionId) {
		userRegionRepository.deleteByUserIdAndRegionId(userId, regionId);
	}

}
