package com.codesquad.secondhand.domain.item;

import java.time.LocalDateTime;
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
import javax.persistence.Table;

import org.springframework.data.annotation.LastModifiedDate;

import com.codesquad.secondhand.domain.category.Category;
import com.codesquad.secondhand.domain.chat.Chat;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.item_image.ItemImage;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.status.Status;
import com.codesquad.secondhand.domain.user.User;
import com.codesquad.secondhand.domain.wishlist.Wishlist;
import com.codesquad.secondhand.util.BaseTimeEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "item")
public class Item extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "region_id")
	private Region region;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "status_id")
	private Status status;

	@Embedded
	private DetailShot detailShot;

	@OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
	private List<Wishlist> wishLists = new ArrayList<>();

	@OneToMany(mappedBy = "item")
	private List<Chat> chats = new ArrayList<>();

	@LastModifiedDate
	private LocalDateTime updatedAt;

	private String title;
	private String content;
	private Integer price;
	private Long views;
	private boolean isDeleted;

	public Item(User user, Category category, Region region, Status status,
		LocalDateTime updatedAt, String title, String content, Integer price) {
		this.user = user;
		this.category = category;
		this.region = region;
		this.status = status;
		this.detailShot = new DetailShot();
		this.updatedAt = updatedAt;
		this.title = title;
		this.content = content;
		this.price = price;
		this.views = 0L;
		this.isDeleted = false;
	}

	public List<Image> listImage() {
		return detailShot.listAllImages();
	}

	public int getNumChat() {
		return this.getChats().size();
	}

	public int getNumLikes() {
		return this.getWishLists().size();
	}

	public boolean isInWishlist(Long userId) {
		return wishLists.stream()
			.anyMatch(w -> w.getUser().isSameUserAs(userId));
	}

	public String getThumbnailUrl() {
		return detailShot.getThumbnailUrl();
	}

	public void addItemImages(List<Image> images) {
		for (Image image : images) {
			detailShot.addItemImage(new ItemImage(null, this, image));
		}
	}

	public void removeItemImage(Image image) {
		detailShot.removeItemImage(image);
	}

	public void delete(Long userId) {
		this.user.validateSameUser(userId);
		this.isDeleted = true;
	}

	public void update(Long userId, String title, Integer price, String content, List<Image> images,
		Category category, Region region) {
		this.user.validateSameUser(userId);
		this.user.validateHasRegion(region);
		this.title = title;
		this.price = price;
		this.content = content;
		this.category = category;
		this.region = region;
		detailShot.clear();
		addItemImages(images);
	}

	public void updateStatus(Long userId, Status status) {
		this.user.validateSameUser(userId);
		this.status = status;
	}

}
