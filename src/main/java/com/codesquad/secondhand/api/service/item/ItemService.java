package com.codesquad.secondhand.api.service.item;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.controller.item.response.ItemDetailResponse;
import com.codesquad.secondhand.api.service.item.request.ItemPostServiceRequest;
import com.codesquad.secondhand.api.service.item.request.ItemUpdateServiceRequest;
import com.codesquad.secondhand.api.service.item.response.ItemResponse;
import com.codesquad.secondhand.api.service.item.response.ItemSliceResponse;
import com.codesquad.secondhand.api.service.item.response.ItemUpdateResponse;
import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.category.CategoryRepository;
import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.item.ItemRepository;
import com.codesquad.secondhand.domain.item.QueryItemRepository;
import com.codesquad.secondhand.domain.item_image.ItemImageRepository;
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
	private final ItemImageRepository itemImageRepository;

	@Transactional(readOnly = true)
	public ItemSliceResponse listOfItems(Long categoryId, Long regionId, Pageable pageable) {
		Slice<ItemResponse> responses = queryItemRepository.filteredListByCategoryAndRegion(categoryId, regionId, pageable);
		List<ItemResponse> itemList = responses.getContent();

		return new ItemSliceResponse(responses.hasNext(), itemList);
	}

	@Transactional
	public void postItem(ItemPostServiceRequest request, Long userId) {
		User seller = userRepository.findById(userId).orElseThrow(NoSuchUserException::new);
		Region region = regionRepository.findById(request.getRegionId()).orElseThrow(NoSuchRegionException::new);
		seller.validateHasRegion(region);
		Category category = categoryRepository.findById(request.getCategoryId())
			.orElseThrow(NoSuchCategoryException::new);
		Status status = statusRepository.findById(FOR_SALE_ID).orElseThrow(NoSuchStatusException::new);

		Item item = request.toEntity(seller, category, region, status);
		item.addItemImages(request.getImages());
		itemRepository.save(item);
	}

	// todo : incrementView
	@Transactional(readOnly = true)
	public ItemDetailResponse getItemDetail(Long itemId, Long userId) {
		Item item = itemRepository.findDetailById(itemId).orElseThrow(NoSuchItemException::new);
		return ItemDetailResponse.from(item, userId);
	}

	// todo : 이미지 삭제 여부
	@Transactional
	public void deleteItem(Long itemId, Long userId) {
		userRepository.findById(userId).orElseThrow(NoSuchUserException::new);
		Item item = itemRepository.findDetailById(itemId).orElseThrow(NoSuchItemException::new);
		item.delete(userId);
	}

	@Transactional
	public ItemUpdateResponse updateItem(ItemUpdateServiceRequest request, Long userId) {
		Item item = itemRepository.findDetailById(request.getId()).orElseThrow(NoSuchItemException::new);
		User loginUser = userRepository.findById(userId).orElseThrow(NoSuchUserException::new);
		Region region = regionRepository.findById(request.getRegionId()).orElseThrow(NoSuchRegionException::new);
		loginUser.validateHasRegion(region);
		Category category = categoryRepository.findById(request.getCategoryId())
			.orElseThrow(NoSuchCategoryException::new);

		itemImageRepository.deleteAllByItemId(item.getId());
		item.update(userId, request.getTitle(), request.getPrice(), request.getContent(), request.getImages(), category,
			region);
		return new ItemUpdateResponse(item.getId());
	}

}
