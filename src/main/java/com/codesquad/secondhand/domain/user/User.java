package com.codesquad.secondhand.domain.user;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.user_region.UserRegion;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nickname;

	private String email;

	private String password;

	private String profile;

	private LocalDateTime createdAt;

	@Embedded
	private MyRegion myRegion;

	public List<UserRegion> listUserRegion() {
		return myRegion.listAll();
	}

	public void addUserRegion(Region region) {
		myRegion.addRegion(new UserRegion(null, this, region));
	}

	public void removeUserRegion(Region region) {
		myRegion.removeRegion(region);
	}

}
