package com.codesquad.secondhand.api.service.item;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.controller.item.response.ItemDetailResponse;
import com.codesquad.secondhand.api.controller.item.response.ItemPostResponse;
import com.codesquad.secondhand.api.service.item.request.ItemPostServiceRequest;
import com.codesquad.secondhand.api.service.item.request.ItemStatusUpdateServiceRequest;
import com.codesquad.secondhand.api.service.item.request.ItemUpdateServiceRequest;
import com.codesquad.secondhand.api.service.item.response.ItemResponse;
import com.codesquad.secondhand.api.service.item.response.ItemSliceResponse;
import com.codesquad.secondhand.api.service.item.response.ItemStatusUpdateResponse;
import com.codesquad.secondhand.api.service.item.response.ItemUpdateResponse;
import com.codesquad.secondhand.api.service.redis.RedisService;
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

	private final RedisService redisService;
	private final ItemRepository itemRepository;
	private final UserRepository userRepository;
	private final CategoryRepository categoryRepository;
	private final RegionRepository regionRepository;
	private final StatusRepository statusRepository;
	private final QueryItemRepository queryItemRepository;

	@Transactional(readOnly = true)
	public ItemSliceResponse findFilteredItemList(Long categoryId, Long regionId, Pageable pageable) {
		Slice<Item> responses = queryItemRepository.filteredByCategoryIdAndRegionId(categoryId, regionId,
			pageable);

		return new ItemSliceResponse(responses.hasNext(), ItemResponse.from(responses.getContent()));
	}

	@Transactional
	public ItemPostResponse postItem(ItemPostServiceRequest request, Long userId) {
		User seller = userRepository.findById(userId).orElseThrow(NoSuchUserException::new);
		Region region = regionRepository.findById(request.getRegionId()).orElseThrow(NoSuchRegionException::new);
		seller.validateHasRegion(region);
		Category category = categoryRepository.findById(request.getCategoryId())
			.orElseThrow(NoSuchCategoryException::new);
		Status status = statusRepository.findById(FOR_SALE_ID).orElseThrow(NoSuchStatusException::new);

		Item item = request.toEntity(seller, category, region, status);
		item.addItemImages(request.getImages());
		itemRepository.save(item);
		return ItemPostResponse.from(item);
	}

	// todo : incrementView
	@Transactional(readOnly = true)
	public ItemDetailResponse getItemDetail(Long itemId, Long userId) {
		redisService.incrementViews(itemId);
		Item item = itemRepository.findItemDetailById(itemId).orElseThrow(NoSuchItemException::new);
		return ItemDetailResponse.from(item, userId);
	}

	// todo : 이미지 삭제 여부
	@Transactional
	public void deleteItem(Long itemId, Long userId) {
		userRepository.findById(userId).orElseThrow(NoSuchUserException::new);
		Item item = itemRepository.findItemDetailById(itemId).orElseThrow(NoSuchItemException::new);
		item.delete(userId);
	}

	@Transactional
	public ItemUpdateResponse updateItem(ItemUpdateServiceRequest request, Long userId) {
		Item item = itemRepository.findItemDetailById(request.getId()).orElseThrow(NoSuchItemException::new);
		Region region = regionRepository.findById(request.getRegionId()).orElseThrow(NoSuchRegionException::new);
		Category category = categoryRepository.findById(request.getCategoryId())
			.orElseThrow(NoSuchCategoryException::new);

		item.update(userId, request.getTitle(), request.getPrice(), request.getContent(), request.getImages(), category,
			region);
		return new ItemUpdateResponse(item.getId());
	}

	@Transactional
	public ItemStatusUpdateResponse updateItemStatus(ItemStatusUpdateServiceRequest request, Long userId) {
		Item item = itemRepository.findItemDetailById(request.getItemId()).orElseThrow(NoSuchItemException::new);
		Status status = statusRepository.findById(request.getStatus()).orElseThrow(NoSuchStatusException::new);
		item.updateStatus(userId, status);
		return new ItemStatusUpdateResponse(item.getId());
	}

}
