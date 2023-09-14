package com.codesquad.secondhand.domain.item;

import static com.codesquad.secondhand.domain.item.QItem.*;

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
public class QueryItemRepository {

	private final JPAQueryFactory queryFactory;

	public Slice<Item> filteredByCategoryIdAndRegionId(Long categoryId, Long regionId, Pageable pageable) {
		List<Item> itemList = queryFactory
			.selectFrom(item)
			.where(
				item.region.id.eq(regionId),
				item.isDeleted.isFalse(),
				categoryIdEq(categoryId)
			)
			.orderBy(item.updatedAt.desc())
			.limit(pageable.getPageSize() + 1) // 다음 항목 있는지 확인
			.offset(pageable.getOffset())
			.fetch();
		return checkLastPage(pageable.getPageSize(), itemList);
	}

	public Slice<Item> filteredByUserIdAndStatusIds(Long userId, List<Long> statusIds, Pageable pageable) {
		List<Item> itemList = queryFactory
			.selectFrom(item)
			.where(
				item.user.id.eq(userId),
				item.isDeleted.isFalse(),
				statusIdEq(statusIds)
			)
			.orderBy(item.updatedAt.desc())
			.limit(pageable.getPageSize() + 1) // 다음 항목 있는지 확인
			.offset(pageable.getOffset())
			.fetch();
		return checkLastPage(pageable.getPageSize(), itemList);
	}

	private BooleanExpression categoryIdEq(Long categoryId) {
		if (categoryId.equals(1L)) {
			return null;
		}
		return item.category.id.eq(categoryId);
	}

	private BooleanExpression statusIdEq(List<Long> statusIds) {
		if (statusIds == null || statusIds.isEmpty()) {
			return null;
		} else {
			return item.status.id.in(statusIds);
		}
	}

	private Slice<Item> checkLastPage(int pageSize, List<Item> itemList) {
		boolean hasNext = false;
		if (itemList.size() > pageSize) {
			hasNext = true;
			itemList.remove(pageSize);
		}
		return new SliceImpl<>(itemList, PageRequest.ofSize(pageSize), hasNext);
	}

}
