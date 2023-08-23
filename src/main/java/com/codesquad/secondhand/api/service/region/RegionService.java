package com.codesquad.secondhand.api.service.region;

import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.codesquad.secondhand.api.service.region.response.RegionResponse;
import com.codesquad.secondhand.api.service.region.response.RegionSliceResponse;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RegionService {

	private static final int REGION_PER_PAGE = 20;

	private final RegionRepository regionRepository;

	public RegionSliceResponse listAllRegions(final int cursor) {
		final Pageable pageable = PageRequest.of(cursor, REGION_PER_PAGE);
		final Slice<Region> regions = regionRepository.findSliceBy(pageable);

		return new RegionSliceResponse(regions.hasNext(), regions
			.stream()
			.map(RegionResponse::from)
			.collect(Collectors.toUnmodifiableList()));
	}

}
