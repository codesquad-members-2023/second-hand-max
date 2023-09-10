package com.codesquad.secondhand.domain.item;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;

import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.item_image.ItemImage;
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

	public void addImage(ItemImage itemImage) {
		itemImages.add(itemImage);
	}

	public void removeImage(Image image) {
		itemImages.remove(validateItemImage(image));
	}

	private ItemImage validateItemImage(Image image) {
		return itemImages.stream()
			.filter(i -> i.findImageId().equals(image.getId()))
			.findFirst()
			.orElseThrow(NoSuchItemImageException::new);
	}
}
