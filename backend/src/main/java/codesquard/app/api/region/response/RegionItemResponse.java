package codesquard.app.api.region.response;

import java.util.Arrays;
import java.util.stream.Collectors;

import codesquard.app.domain.region.Region;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RegionItemResponse {

	private Long addressId;
	private String fullAddressName;
	private String addressName;

	private RegionItemResponse(Long addressId, String fullAddressName, String addressName) {
		this.addressId = addressId;
		this.fullAddressName = fullAddressName;
		this.addressName = addressName;
	}

	public static RegionItemResponse from(Region region) {
		Long addressId = region.getId();
		String fullAddressName = region.getName();
		String addressName = convertShortAddressName(fullAddressName);
		return new RegionItemResponse(addressId, fullAddressName, addressName);
	}

	private static String convertShortAddressName(String fullAddressName) {
		final String space = " ";
		return Arrays.stream(fullAddressName.split(space))
			.skip(2)
			.collect(Collectors.joining(space));
	}
}
