package com.codesquad.secondhand.domain.item_image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ItemImageRepository extends JpaRepository<ItemImage, Long> {

	@Modifying
	@Query("DELETE FROM ItemImage ii WHERE ii.item.id = :id")
	void deleteAllByItemId(Long id);
}
