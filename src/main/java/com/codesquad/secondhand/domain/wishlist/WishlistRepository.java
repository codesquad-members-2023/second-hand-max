package com.codesquad.secondhand.domain.wishlist;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

	@Query(value = "SELECT w FROM Wishlist AS w "
		+ "LEFT JOIN fetch w.item AS wi "
		+ "JOIN fetch wi.region "
		+ "JOIN fetch wi.status "
		+ "LEFT JOIN fetch wi.detailShot.itemImages "
		+ "WHERE w.user.id = :userId "
		+ "AND wi.isDeleted = 0 ")
	Slice<Wishlist> findSliceByUserId(Pageable pageable, Long userId);

}
