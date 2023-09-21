package com.codesquad.secondhand.domain.wishlist;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

	@Query(value = "SELECT w FROM Wishlist AS w "
		+ "JOIN fetch w.user AS wu "
		+ "JOIN fetch w.item AS wi "
		+ "JOIN fetch wi.category "
		+ "WHERE wu.id = :userId "
		+ "AND wi.isDeleted = false ")
	List<Wishlist> findWishlistCategoryByUserId(Long userId);

}
