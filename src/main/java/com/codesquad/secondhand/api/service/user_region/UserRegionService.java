package com.codesquad.secondhand.api.service.user_region;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.service.region.exception.NoSuchRegionException;
import com.codesquad.secondhand.api.service.user.exception.NoSuchUserException;
import com.codesquad.secondhand.api.service.user_region.request.UserRegionCreateServiceRequest;
import com.codesquad.secondhand.api.service.user_region.response.UserRegionResponse;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserRegionService {

	private final UserRepository userRepository;
	private final RegionRepository regionRepository;

	@Transactional(readOnly = true)
	public List<UserRegionResponse> listUserRegions(Long userId) {
		User user = userRepository.findCompleteUserById(userId).orElseThrow(NoSuchUserException::new);
		return user.listUserRegion()
			.stream()
			.map(UserRegionResponse::from)
			.collect(Collectors.toUnmodifiableList());
	}

	@Transactional
	public void createUserRegion(UserRegionCreateServiceRequest serviceRequest) {
		User user = userRepository.findCompleteUserById(serviceRequest.getUserId())
			.orElseThrow(NoSuchUserException::new);
		Region region = regionRepository.findById(serviceRequest.getRegionId())
			.orElseThrow(NoSuchRegionException::new);
		user.addUserRegion(region);
	}

	@Transactional
	public void deleteUserRegion(Long userId, Long regionId) {
		User user = userRepository.findCompleteUserById(userId).orElseThrow(NoSuchUserException::new);
		Region region = regionRepository.findById(regionId).orElseThrow(NoSuchRegionException::new);
		user.removeUserRegion(region);
	}

}
