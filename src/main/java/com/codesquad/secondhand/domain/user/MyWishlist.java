package com.codesquad.secondhand.domain.user;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;

import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.wishlist.Wishlist;
import com.codesquad.secondhand.exception.wishlist.DuplicatedWishlistException;
import com.codesquad.secondhand.exception.wishlist.NoSuchWishlistException;

import lombok.NoArgsConstructor;

@NoArgsConstructor
@Embeddable
public class MyWishlist {

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private final List<Wishlist> wishlists = new ArrayList<>();

	public List<Wishlist> listAll() {
		return List.copyOf(wishlists);
	}

	public void addWishList(Wishlist wishlist) {
		validateDuplicateWishlist(wishlist);
		wishlists.add(wishlist);
	}

	public void removeWishList(Item item) {
		wishlists.remove(validateWishlist(item));
	}

	private Wishlist validateWishlist(Item item) {
		return wishlists.stream()
			.filter(wishlist -> wishlist.getItem().getId().equals(item.getId()))
			.findFirst()
			.orElseThrow(NoSuchWishlistException::new);
	}

	private void validateDuplicateWishlist(Wishlist wishlist) {
		if (this.wishlists.stream().anyMatch(w -> w.getItem().equals(wishlist.getItem()))) {
			throw new DuplicatedWishlistException();
		}
	}

}
