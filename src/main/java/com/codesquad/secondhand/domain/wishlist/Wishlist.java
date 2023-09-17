package com.codesquad.secondhand.domain.wishlist;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.codesquad.secondhand.domain.item.Item;
import com.codesquad.secondhand.domain.user.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Entity
@Table(name = "wishlist")
public class Wishlist {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_id")
	private Item item;

	public Long getItemId() {
		return this.item.getId();
	}

	public String getItemTitle() {
		return this.item.getTitle();
	}

	public Long getItemSellerId() {
		return this.item.getUser().getId();
	}

	public String getItemRegionTitle() {
		return this.item.getRegion().getTitle();
	}

	public String getItemStatusType() {
		return this.item.getStatus().getType();
	}

	public String getItemThumbnailUrl() {
		return this.item.getThumbnailUrl();
	}

	public LocalDateTime getItemUpdatedAt() {
		return this.item.getUpdatedAt();
	}

	public Integer getItemPrice() {
		return this.item.getPrice();
	}

	public int getItemNumChat() {
		return this.item.getNumChat();
	}

	public int getItemNumLikes() {
		return this.item.getNumLikes();
	}

}
