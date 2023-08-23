package com.codesquad.secondhand.api.service.region;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.api.service.region.response.RegionSliceResponse;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.region.RegionRepository;

class RegionServiceTest extends IntegrationTestSupport {

	@Autowired
	private RegionService regionService;

	@Autowired
	private RegionRepository regionRepository;

	@BeforeEach
	private void init() {
		regionRepository.deleteAllInBatch();
	}

	@DisplayName("cursor 값에 해당하는 page의 동네 목록을 생성한다.")
	@CsvSource(value = {"0,20,true", "1,20,false"})
	@ParameterizedTest
	void listAllRegions(int cursor, int size, boolean hasNext) {
		// given
		createRegionFixture(40);
		Pageable pageable = PageRequest.of(cursor, size);

		// when
		RegionSliceResponse regions = regionService.listAllRegions(cursor);

		// then
		assertAll(
			() -> assertThat(regions.isHasMore()).isEqualTo(hasNext),
			() -> assertThat(regions.getRegions()).hasSize(size)
		);
	}

	private void createRegionFixture(int size) {
		List<Region> regions = IntStream.rangeClosed(1, size)
			.mapToObj(i -> new Region(null, "test region" + i))
			.collect(Collectors.toList());
		regionRepository.saveAll(regions);
	}

}
