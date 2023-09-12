package com.codesquad.secondhand.domain.item;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends JpaRepository<Item, Long> {

	@Query("SELECT i FROM Item i "
		+ "INNER JOIN FETCH i.user "
		+ "INNER JOIN FETCH i.category "
		+ "INNER JOIN FETCH i.region "
		+ "INNER JOIN FETCH i.status "
		+ "LEFT JOIN FETCH i.detailShot.itemImages ii "
		+ "LEFT JOIN FETCH ii.image "
		+ "WHERE i.id = :id AND i.isDeleted = FALSE")
	Optional<Item> findDetailById(@Param("id") Long itemId);

}
