package com.codesquad.secondhand.domain.user;

import java.util.List;
import java.util.Objects;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.user_region.UserRegion;
import com.codesquad.secondhand.domain.wishlist.Wishlist;
import com.codesquad.secondhand.exception.auth.PermissionDeniedException;
import com.codesquad.secondhand.util.BaseTimeEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Entity
@Table(name = "user")
public class User extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Embedded
	private MyRegion myRegion;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "image_id")
	private Image profile;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "provider_id")
	private Provider provider;

	@Embedded
	private MyWishlist myWishlist;

	private String nickname;
	private String email;
	private String password;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "selected_region_id")
	private Region selectedRegion;

	public String findProfileUrl() {
		return profile == null ? null : profile.getImageUrl();
	}

	public List<UserRegion> listUserRegion() {
		return myRegion.listAll();
	}

	public void addUserRegion(Region region) {
		myRegion.addRegion(new UserRegion(null, this, region));
	}

	public void removeUserRegion(Region region) {
		myRegion.removeRegion(region);
		selectedRegion = myRegion.findFirstRegion();
	}

	public void updateSelectedRegion(Region region) {
		myRegion.validateUserRegion(region);
		selectedRegion = region;
	}

	public void updateInformation(String newNickname, Image newProfile) {
		this.nickname = newNickname;
		this.profile = newProfile;
	}

	public void validateSameUser(Long targetUserId) {
		if (!isSameUserAs(targetUserId)) {
			throw new PermissionDeniedException();
		}
	}

	public boolean isSameUserAs(Long targetUserId) {
		return Objects.equals(this.id, targetUserId);
	}

	public void validateHasRegion(Region region) {
		myRegion.validateUserRegion(region);
	}

	public void addWishlist(Item item) {
		myWishlist.addWishList(new Wishlist(null, this, item));
	}

	public void removeWishlist(Item item) {
		myWishlist.removeWishList(item);
	}

}
