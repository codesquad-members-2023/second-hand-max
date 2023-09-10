package com.codesquad.secondhand.domain.item;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends JpaRepository<Item, Long> {

	@Query("select i from Item i "
		+ "inner join fetch i.user "
		+ "inner join fetch i.category "
		+ "inner join fetch i.region "
		+ "inner join fetch i.status "
		+ "left join fetch i.detailShot.itemImages ii "
		+ "left join fetch ii.image "
		+ "where i.id = :id and i.isDeleted = false")
	Optional<Item> findDetailById(@Param("id") Long itemId);
}
