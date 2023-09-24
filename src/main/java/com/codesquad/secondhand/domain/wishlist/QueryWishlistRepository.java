package com.codesquad.secondhand.domain.wishlist;

import static com.codesquad.secondhand.domain.category.QCategory.*;
import static com.codesquad.secondhand.domain.item.QItem.*;
import static com.codesquad.secondhand.domain.region.QRegion.*;
import static com.codesquad.secondhand.domain.status.QStatus.*;
import static com.codesquad.secondhand.domain.user.QUser.*;
import static com.codesquad.secondhand.domain.wishlist.QWishlist.*;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class QueryWishlistRepository {

	private final JPAQueryFactory queryFactory;

	public Slice<Wishlist> filteredByUserIdAndCategoryId(Long userId, Long categoryId, Pageable pageable) {
		List<Wishlist> wishlists = queryFactory
			.selectFrom(wishlist)
			.join(wishlist.user, user).fetchJoin()
			.join(wishlist.item, item).fetchJoin()
			.leftJoin(item.category, category).fetchJoin()
			.leftJoin(item.status, status).fetchJoin()
			.leftJoin(item.region, region).fetchJoin()
			.where(
				wishlist.user.id.eq(userId),
				categoryIdEq(categoryId),
				wishlist.item.isDeleted.isFalse()
			)
			.orderBy(wishlist.id.desc())
			.limit(pageable.getPageSize() + 1)
			.offset(pageable.getOffset())
			.fetch();
		return checkLastPage(pageable.getPageSize(), wishlists);
	}

	private BooleanExpression categoryIdEq(Long categoryId) {
		if (categoryId.equals(1L)) {
			return null;
		}
		return wishlist.item.category.id.eq(categoryId);
	}

	private Slice<Wishlist> checkLastPage(int pageSize, List<Wishlist> wishlists) {
		boolean hasNext = false;
		if (wishlists.size() > pageSize) {
			hasNext = true;
			wishlists.remove(pageSize);
		}
		return new SliceImpl<>(wishlists, PageRequest.ofSize(pageSize), hasNext);
	}

}
