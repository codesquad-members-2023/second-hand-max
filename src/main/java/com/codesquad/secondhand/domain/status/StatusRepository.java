package com.codesquad.secondhand.domain.status;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {

	boolean existsByIdIn(List<Long> statusIds);

}
