package com.codesquad.secondhand.domain.user_region;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRegionRepository extends JpaRepository<UserRegion, Long> {

	List<UserRegion> findByUserId(Long userId);

	Long countByUserId(Long userId);

	boolean existsByUserIdAndRegionId(Long userId, Long regionId);

	void deleteByUserIdAndRegionId(Long userId, Long regionId);

}
