package com.codesquad.secondhand.domain.region;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Entity
public class Region {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private final Long id;
	private final String title;

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

}
