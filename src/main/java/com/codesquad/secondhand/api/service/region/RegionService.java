package com.codesquad.secondhand.api.service.region;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.codesquad.secondhand.api.service.region.response.RegionResponse;
import com.codesquad.secondhand.domain.region.RegionRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RegionService {

	private final RegionRepository regionRepository;

	public List<RegionResponse> listRegions() {
		return regionRepository.findAll().stream().map(RegionResponse::from).collect(Collectors.toUnmodifiableList());
	}

}
