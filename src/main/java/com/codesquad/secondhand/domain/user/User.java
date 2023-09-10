package com.codesquad.secondhand.domain.user;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.provider.Provider;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.user_region.UserRegion;
import com.codesquad.secondhand.domain.wishlist.WishList;
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

	// TODO: MyWishList와 같이 일급 객체로 리팩토링
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<WishList> wishLists = new ArrayList<>();

	private String nickname;
	private String email;
	private String password;

	public String getProfileUrl() {
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
	}

	public void updateInfo(String newNickname, Image newProfile) {
		this.nickname = newNickname;
		this.profile = newProfile;
	}

}
