package com.codesquad.secondhand.domain.user_region;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.user.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Entity
@Table(name = "user_region")
public class UserRegion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "region_id")
	private Region region;

	public Long findRegionId() {
		return this.region.getId();
	}

	public String findRegionTitle() {
		return this.region.getTitle();
	}

}
