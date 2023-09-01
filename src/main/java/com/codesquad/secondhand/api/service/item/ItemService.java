package com.codesquad.secondhand.api.service.item;

import java.util.List;

import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.codesquad.secondhand.api.service.item.response.ItemResponse;
import com.codesquad.secondhand.api.service.item.response.ItemSliceResponse;
import com.codesquad.secondhand.domain.item.ItemRepository;
import com.codesquad.secondhand.domain.item.QueryItemRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ItemService {

	private final ItemRepository itemRepository;
	private final QueryItemRepository queryItemRepository;

	public ItemSliceResponse listOfItems(Long categoryId, Long regionId, int page, int size) {
		Slice<ItemResponse> responses = queryItemRepository.filteredListByCategoryAndRegion(categoryId, regionId, page,
			size);
		List<ItemResponse> itemList = responses.getContent();

		return new ItemSliceResponse(responses.hasNext(), itemList);
	}

}
