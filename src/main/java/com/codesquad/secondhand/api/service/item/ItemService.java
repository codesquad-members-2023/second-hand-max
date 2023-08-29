package com.codesquad.secondhand.api.service.item;

import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.codesquad.secondhand.api.service.item.response.ItemResponse;
import com.codesquad.secondhand.api.service.item.response.ItemSliceResponse;
import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.item.ItemRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ItemService {

	private static final int ITEM_PER_PAGE = 10;

	private final ItemRepository itemRepository;

	public ItemSliceResponse listOfItems(Long categoryId, Long regionId, int cursor) {
		final Pageable pageable = PageRequest.of(cursor, ITEM_PER_PAGE);
		final Slice<Item> items = itemRepository.findSliceBy(categoryId,
			regionId, pageable);

		return new ItemSliceResponse(items.hasNext(), items
			.stream()
			.map(ItemResponse::from)
			.collect(Collectors.toUnmodifiableList()));
	}

}
