package com.codesquad.secondhand.domain.item;

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
import com.codesquad.secondhand.util.BaseTimeEntity;

import lombok.Getter;

@Getter
@Table(name = "item_image")
@Entity
public class ItemImage extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_id")
	private Item item;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "image_id")
	private Image image;

}
