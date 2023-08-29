package com.codesquad.secondhand.domain.item;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends JpaRepository<Item, Long> {

	@Query(
		"SELECT i FROM Item i "
			+ "LEFT JOIN FETCH i.category c "
			+ "LEFT JOIN FETCH i.region r "
			+ "WHERE i.isDeleted = false "
			+ "AND c.id = :categoryId "
			+ "AND r.id = :regionId "
			+ "ORDER BY i.updatedAt DESC"
	)
	Slice<Item> findSliceBy(@Param("categoryId") Long categoryId, @Param("regionId") Long regionId,
		@Param("pageable") Pageable pageable);

}
