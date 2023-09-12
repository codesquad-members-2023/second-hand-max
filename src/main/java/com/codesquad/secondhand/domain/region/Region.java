package com.codesquad.secondhand.domain.region;

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
@Table(name = "region")
public class Region {

	public static final Long DEFAULT_REGION_ID = 432L;
	public static final String DEFAULT_REGION_TITLE = "서울특별시 강남구 역삼동";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	public static final Region ofDefault() {
		return new Region(DEFAULT_REGION_ID, DEFAULT_REGION_TITLE);
	}

}
