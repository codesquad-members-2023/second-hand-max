package com.codesquad.secondhand.domain.item;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;

import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.item_image.ItemImage;
import com.codesquad.secondhand.exception.image.NoSuchImageException;
import com.codesquad.secondhand.exception.item_image.NoSuchItemImageException;

import lombok.NoArgsConstructor;

@NoArgsConstructor
@Embeddable
public class DetailShot {

	@OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
	private final List<ItemImage> itemImages = new ArrayList<>();

	public List<Image> listAllImages() {
		return itemImages.stream()
			.map(ItemImage::getImage)
			.collect(Collectors.toUnmodifiableList());
	}

	public String getThumbnailUrl() {
		if (itemImages.isEmpty()) {
			return null;
		}
		return itemImages.stream()
			.findFirst()
			.map(ItemImage::getImage)
			.orElseThrow(NoSuchImageException::new)
			.getImageUrl();
	}

	public void addItemImage(ItemImage itemImage) {
		itemImages.add(itemImage);
	}

	public void removeItemImage(Image image) {
		itemImages.remove(validateItemImage(image));
	}

	public void clear() {
		itemImages.clear();
	}

	private ItemImage validateItemImage(Image image) {
		return itemImages.stream()
			.filter(i -> i.findImageId().equals(image.getId()))
			.findFirst()
			.orElseThrow(NoSuchItemImageException::new);
	}
}
