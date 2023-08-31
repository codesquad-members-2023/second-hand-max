package com.codesquad.secondhand.domain.user;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;

import com.codesquad.secondhand.api.service.user_region.exception.DuplicatedUserRegionException;
import com.codesquad.secondhand.api.service.user_region.exception.ExceedUserRegionLimitException;
import com.codesquad.secondhand.api.service.user_region.exception.MinimumUserRegionViolationException;
import com.codesquad.secondhand.api.service.user_region.exception.NoSuchUserRegionException;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.user_region.UserRegion;

import lombok.NoArgsConstructor;

@NoArgsConstructor
@Embeddable
public class MyRegion {

	private static final int MINIMUM_USER_REGION_COUNT = 1;
	private static final int MAXIMUM_USER_REGION_COUNT = 2;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private final List<UserRegion> userRegions = new ArrayList<>();

	// --- Validation ---
	public List<UserRegion> listAll() {
		return List.copyOf(userRegions);
	}

	public void addRegion(UserRegion userRegion) {
		validateUserRegionLimit();
		validateDuplicateUserRegion(userRegion);
		userRegions.add(userRegion);
	}

	public void removeRegion(Region region) {
		validateMinimumUserRegion();
		userRegions.remove(validateUserRegion(region));
	}

	private void validateUserRegionLimit() {
		if (this.userRegions.size() == MAXIMUM_USER_REGION_COUNT) {
			throw new ExceedUserRegionLimitException();
		}
	}

	private void validateDuplicateUserRegion(UserRegion userRegion) {
		if (this.userRegions.stream().anyMatch(r -> r.getRegion().equals(userRegion.getRegion()))) {
			throw new DuplicatedUserRegionException();
		}
	}

	private void validateMinimumUserRegion() {
		if (this.userRegions.size() == MINIMUM_USER_REGION_COUNT) {
			throw new MinimumUserRegionViolationException();
		}
	}

	private UserRegion validateUserRegion(Region region) {
		return userRegions.stream()
			.filter(r -> r.findRegionId().equals(region.getId()))
			.findFirst()
			.orElseThrow(NoSuchUserRegionException::new);
	}

}
