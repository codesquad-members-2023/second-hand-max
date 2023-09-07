package com.codesquad.secondhand.domain.auth;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshRepository extends JpaRepository<Refresh, Long> {

	void deleteByUserId(Long userId);

	boolean existsByUserIdAndToken(Long userId, String refreshToken);

}
