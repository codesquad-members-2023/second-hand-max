package com.codesquad.secondhand.api.service.region;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.api.service.region.response.RegionSliceResponse;
import com.codesquad.secondhand.domain.region.RegionRepository;
import com.codesquad.secondhand.domain.user_region.UserRegionRepository;

class RegionServiceTest extends IntegrationTestSupport {

	@Autowired
	private RegionService regionService;

	@Autowired
	private RegionRepository regionRepository;

	@Autowired
	private UserRegionRepository userRegionRepository;

	@BeforeEach
	private void init() {
		userRegionRepository.deleteAllInBatch();
		regionRepository.deleteAllInBatch();
	}

	@DisplayName("cursor 값에 해당하는 page의 동네 목록을 생성한다.")
	@CsvSource(value = {"0,20,true", "1,20,false"})
	@ParameterizedTest
	void listAllRegions(int cursor, int size, boolean hasNext) {
		// given
		regionRepository.saveAll(FixtureFactory.createRegionFixtures(40));

		// when
		RegionSliceResponse regions = regionService.listAllRegions("", cursor);

		// then
		assertAll(
			() -> assertThat(regions.isHasMore()).isEqualTo(hasNext),
			() -> assertThat(regions.getRegions()).hasSize(size)
		);
	}

}
