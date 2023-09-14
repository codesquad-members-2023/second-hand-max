package com.cokkiri.secondhand.item.dto.response;

import com.cokkiri.secondhand.item.entity.ItemMetadata;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class CountDataResponse {

	private Long chat;
	private Long favorite;

	public static CountDataResponse from(ItemMetadata itemMetadata) {
		return new CountDataResponse(
			itemMetadata.getChat(),
			itemMetadata.getFavorite()
		);
	}
}
