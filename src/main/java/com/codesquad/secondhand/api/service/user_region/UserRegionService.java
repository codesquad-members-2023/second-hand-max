package com.codesquad.secondhand.api.service.user_region;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.service.region.exception.NoSuchRegionException;
import com.codesquad.secondhand.api.service.user.exception.NoSuchUserException;
import com.codesquad.secondhand.api.service.user_region.exception.DuplicatedUserRegionException;
import com.codesquad.secondhand.api.service.user_region.exception.ExceedUserRegionLimitException;
import com.codesquad.secondhand.api.service.user_region.exception.MinimumUserRegionViolationException;
import com.codesquad.secondhand.api.service.user_region.request.UserRegionCreateServiceRequest;
import com.codesquad.secondhand.api.service.user_region.response.UserRegionResponse;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.domain.user_region.UserRegion;
import com.codesquad.secondhand.domain.user_region.UserRegionRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserRegionService {

	private static final Long MINIMUM_USER_REGION_COUNT = 1L;
	private static final Long MAXIMUM_USER_REGION_COUNT = 2L;

	private final UserRepository userRepository;
	private final RegionRepository regionRepository;
	private final UserRegionRepository userRegionRepository;

	@Transactional(readOnly = true)
	public List<UserRegionResponse> listUserRegions(Long userId) {
		return userRegionRepository.findByUserId(userId)
			.stream()
			.map(UserRegionResponse::from)
			.collect(Collectors.toUnmodifiableList());
	}

	@Transactional
	public void createUserRegion(UserRegionCreateServiceRequest serviceRequest) {
		final User user = userRepository.findById(serviceRequest.getUserId()).orElseThrow(NoSuchUserException::new);
		final Region region = regionRepository.findById(serviceRequest.getRegionId())
			.orElseThrow(NoSuchRegionException::new);
		validateUserRegionLimit(serviceRequest.getUserId());
		validateDuplicateUserRegion(serviceRequest);
		userRegionRepository.save(new UserRegion(null, user, region));
	}

	@Transactional
	public void deleteUserRegion(Long userId, Long regionId) {
		validateMinimumUserRegion(userId);
		userRegionRepository.deleteByUserIdAndRegionId(userId, regionId);
	}

	// --- Validation ---
	private void validateUserRegionLimit(Long userId) {
		if (userRegionRepository.countByUserId(userId).equals(MAXIMUM_USER_REGION_COUNT)) {
			throw new ExceedUserRegionLimitException();
		}
	}

	private void validateDuplicateUserRegion(UserRegionCreateServiceRequest serviceRequest) {
		if (userRegionRepository.existsByUserIdAndRegionId(serviceRequest.getUserId(), serviceRequest.getRegionId())) {
			throw new DuplicatedUserRegionException();
		}
	}

	private void validateMinimumUserRegion(Long userId) {
		if (userRegionRepository.countByUserId(userId).equals(MINIMUM_USER_REGION_COUNT)) {
			throw new MinimumUserRegionViolationException();
		}
	}

}
