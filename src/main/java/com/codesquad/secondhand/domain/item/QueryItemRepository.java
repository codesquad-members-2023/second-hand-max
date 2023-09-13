package com.codesquad.secondhand.domain.item;

import static com.codesquad.secondhand.domain.chat.QChat.*;
import static com.codesquad.secondhand.domain.image.QImage.*;
import static com.codesquad.secondhand.domain.item.QItem.*;
import static com.codesquad.secondhand.domain.item_image.QItemImage.*;
import static com.codesquad.secondhand.domain.region.QRegion.*;
import static com.codesquad.secondhand.domain.wishlist.QWishlist.*;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import com.codesquad.secondhand.api.service.item.response.ItemResponse;
import com.codesquad.secondhand.api.service.item.response.QItemResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class QueryItemRepository {

	private final JPAQueryFactory queryFactory;

	public Slice<ItemResponse> filteredListByCategoryAndRegion(Long categoryId, Long regionId, Pageable pageable) {
		List<ItemResponse> itemResponseList = queryFactory
			.selectDistinct(new QItemResponse(
				item.id,
				item.title,
				item.region.title,
				item.status.type,
				itemImage.image.imageUrl,
				item.createdAt,
				item.updatedAt,
				item.price,
				chat.countDistinct(),
				wishlist.countDistinct()

			))
			.from(item)
			.where(
				item.region.id.eq(regionId),
				categoryIdEq(categoryId)
			)
			.leftJoin(item.region, region)
			.leftJoin(item.detailShot.itemImages, itemImage)
			.leftJoin(itemImage.image, image)
			.leftJoin(item.chats, chat)
			.leftJoin(item.wishLists, wishlist)
			.groupBy(
				item.id,
				item.title,
				item.region.title,
				item.status.type,
				itemImage.image,
				item.createdAt,
				item.updatedAt,
				item.price
			)
			.orderBy(item.updatedAt.desc())
			.limit(pageable.getPageSize() + 1) // 다음 항목 있는지 확인
			.offset(pageable.getOffset())
			.fetch();
		return checkLastPage(pageable.getPageSize(), itemResponseList);
	}

	private BooleanExpression categoryIdEq(Long categoryId) {
		if (categoryId.equals(1L)) {
			return null;
		}
		return item.category.id.eq(categoryId);
	}

	private Slice<ItemResponse> checkLastPage(int pageSize, List<ItemResponse> itemList) {
		boolean hasNext = false;
		if (itemList.size() > pageSize) {
			hasNext = true;
			itemList.remove(pageSize);
		}
		return new SliceImpl<>(itemList, PageRequest.ofSize(pageSize), hasNext);
	}

}
