package com.codesquad.secondhand.domain.item;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long userId;
	private Long categoryId;
	private Long regionId;
	private String title;
	private String content;
	private int price;
	private ItemStatus status;
	private int views;
	private LocalDateTime postedAt;
	private LocalDateTime updatedAt;
	private boolean isDeleted;

}
