package com.codesquad.secondhand.domain.auth;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

	void deleteByUserId(Long userId);

	boolean existsByUserIdAndToken(Long userId, String refreshToken);

	Optional<RefreshToken> findByUserId(Long userId);

}
