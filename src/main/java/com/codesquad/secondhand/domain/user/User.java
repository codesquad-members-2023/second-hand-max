package com.codesquad.secondhand.domain.user;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.codesquad.secondhand.api.service.user_region.exception.DuplicatedUserRegionException;
import com.codesquad.secondhand.api.service.user_region.exception.ExceedUserRegionLimitException;
import com.codesquad.secondhand.api.service.user_region.exception.MinimumUserRegionViolationException;
import com.codesquad.secondhand.domain.user_region.UserRegion;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String loginId;

	private String nickname;

	private String email;

	private String password;

	private String profile;

	private LocalDateTime createdAt;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<UserRegion> userRegions = new ArrayList<>();

	public void addUserRegion(UserRegion userRegion) {
		validateUserRegionLimit();
		validateDuplicateUserRegion(userRegion);
		userRegion.setUser(this);
		this.userRegions.add(userRegion);
	}

	public void removeUserRegion(UserRegion userRegion) {
		validateMinimumUserRegion();
		userRegions.remove(userRegion);
	}

	// --- Validation ---
	private static final int MINIMUM_USER_REGION_COUNT = 1;
	private static final int MAXIMUM_USER_REGION_COUNT = 2;

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

}
