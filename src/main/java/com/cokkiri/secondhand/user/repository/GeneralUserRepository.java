package com.cokkiri.secondhand.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cokkiri.secondhand.user.entity.GeneralUser;

public interface GeneralUserRepository extends JpaRepository<GeneralUser, Long> {

	Optional<GeneralUser> findByUsername(String username);
	Optional<GeneralUser> findByNickname(String nickname);
}
