package com.codesquad.secondhand.api.service.item;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.controller.item.response.ItemDetailResponse;
import com.codesquad.secondhand.api.service.item.request.ItemPostingServiceRequest;
import com.codesquad.secondhand.api.service.item.response.ItemResponse;
import com.codesquad.secondhand.api.service.item.response.ItemSliceResponse;
import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.category.CategoryRepository;
import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.item.ItemRepository;
import com.codesquad.secondhand.domain.item.QueryItemRepository;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.domain.status.Status;
import com.codesquad.secondhand.domain.status.StatusRepository;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.user.UserRepository;
import com.codesquad.secondhand.exception.category.NoSuchCategoryException;
import com.codesquad.secondhand.exception.item.NoSuchItemException;
import com.codesquad.secondhand.exception.region.NoSuchRegionException;
import com.codesquad.secondhand.exception.status.NoSuchStatusException;
import com.codesquad.secondhand.exception.user.NoSuchUserException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ItemService {

	private static final Long FOR_SALE_ID = 1L;
	private static final Long SOLD_OUT_ID = 2L;
	private static final Long RESERVATION_ID = 3L;

	private final ItemRepository itemRepository;
	private final UserRepository userRepository;
	private final CategoryRepository categoryRepository;
	private final RegionRepository regionRepository;
	private final StatusRepository statusRepository;
	private final QueryItemRepository queryItemRepository;

	@Transactional(readOnly = true)
	public ItemSliceResponse listOfItems(Long categoryId, Long regionId, Pageable pageable) {
		Slice<ItemResponse> responses = queryItemRepository.filteredListByCategoryAndRegion(categoryId, regionId, pageable);
		List<ItemResponse> itemList = responses.getContent();

		return new ItemSliceResponse(responses.hasNext(), itemList);
	}

	@Transactional
	public void postItem(ItemPostingServiceRequest request, Long userId) {
		User seller = userRepository.findById(userId).orElseThrow(NoSuchUserException::new);
		Region region = regionRepository.findById(request.getRegionId()).orElseThrow(NoSuchRegionException::new);
		seller.validateHasRegion(region);
		Category category = categoryRepository.findById(request.getCategoryId())
			.orElseThrow(NoSuchCategoryException::new);
		Status status = statusRepository.findById(FOR_SALE_ID).orElseThrow(NoSuchStatusException::new);

		Item item = new Item(
			seller,
			category,
			region,
			status,
			LocalDateTime.now(),
			request.getTitle(),
			request.getContent(),
			request.getPrice()
		);

		item.addItemImages(request.getImages());
		itemRepository.save(item);
	}

	// todo : incrementView
	@Transactional(readOnly = true)
	public ItemDetailResponse getItemDetail(Long itemId, Long userId) {
		Item item = itemRepository.findDetailById(itemId).orElseThrow(NoSuchItemException::new);
		return ItemDetailResponse.from(item, userId);
	}

}
