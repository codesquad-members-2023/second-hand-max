package com.codesquad.secondhand.domain.region;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Long> {

	Slice<Region> findSliceByTitleContaining(Pageable pageable, String title);

}
