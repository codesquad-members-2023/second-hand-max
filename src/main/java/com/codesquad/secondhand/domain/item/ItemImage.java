package com.codesquad.secondhand.domain.item;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.codesquad.secondhand.util.BaseTimeEntity;

import lombok.Getter;

@Getter
@Table(name = "image")
@Entity
public class ItemImage extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_id")
	private Item item;

	private String imageUrl;
	private boolean isThumbnail;
	private boolean isDeleted;

}
