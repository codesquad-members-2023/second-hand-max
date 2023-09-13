package com.codesquad.secondhand.domain.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.codesquad.secondhand.domain.provider.Provider;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query(value = "SELECT u FROM User AS u "
		+ "LEFT JOIN fetch u.myRegion.userRegions AS ur "
		+ "LEFT JOIN fetch ur.region "
		+ "LEFT JOIN fetch u.selectedRegion "
		+ "WHERE u.id = :userId")
	Optional<User> findCompleteUserById(Long userId);

	Optional<User> findByProviderIdAndEmail(Long providerId, String email);

	boolean existsByNickname(String nickname);

	boolean existsByProviderAndEmail(Provider provider, String email);

}
