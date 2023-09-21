package com.codesquad.secondhand.domain.category;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Entity
@Table(name = "category")
public class Category {

	private static final Long ALL_CATEGORY_ID = 1L;
	private static final String ALL_CATEGORY_NAME = "전체";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;
	private String imageUrl;

	public static Category ofAll() {
		return new Category(ALL_CATEGORY_ID, ALL_CATEGORY_NAME, null);
	}

}
