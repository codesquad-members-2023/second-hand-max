package com.codesquad.secondhand.api.service.user_region.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserRegionSelectionResponse {

	Long selectedId;
	List<UserRegionResponse> userRegions;

}
