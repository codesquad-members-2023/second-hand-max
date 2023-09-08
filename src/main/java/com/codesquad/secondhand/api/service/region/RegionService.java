package com.codesquad.secondhand.api.service.region;

import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codesquad.secondhand.api.service.region.response.RegionResponse;
import com.codesquad.secondhand.api.service.region.response.RegionSliceResponse;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RegionService {

	private final RegionRepository regionRepository;

	@Transactional(readOnly = true)
	public RegionSliceResponse listAllRegions(String title, Pageable pageable) {
		final Slice<Region> regions = regionRepository.findSliceByTitleContaining(pageable, title);

		return new RegionSliceResponse(regions.hasNext(), regions
			.stream()
			.map(RegionResponse::from)
			.collect(Collectors.toUnmodifiableList()));
	}

}
