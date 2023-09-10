package com.codesquad.secondhand.domain.provider;

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
@Table(name = "provider")
public class Provider {

	private static final Long LOCAL_PROVIDER_ID = 1L;
	private static final String LOCAL_PROVIDER_TYPE = "LOCAL";
	private static final Long KAKAO_PROVIDER_ID = 2L;
	private static final String KAKAO_PROVIDER_TYPE = "KAKAO";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String type;

	public static Provider ofLocal() {
		return new Provider(LOCAL_PROVIDER_ID, LOCAL_PROVIDER_TYPE);
	}

	public static Provider ofKakao() {
		return new Provider(KAKAO_PROVIDER_ID, KAKAO_PROVIDER_TYPE);
	}

}
