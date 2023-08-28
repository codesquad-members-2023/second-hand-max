package com.codesquad.secondhand.domain.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

	@Query(value = "SELECT u FROM User AS u LEFT JOIN fetch u.myRegion.userRegions AS ur LEFT JOIN fetch ur.region WHERE u.id = :userId")
	Optional<User> findCompleteUserById(Long userId);

}
