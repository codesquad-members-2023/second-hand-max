package com.codesquad.secondhand.domain.region;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;
import com.codesquad.secondhand.domain.user_region.UserRegionRepository;

class RegionRepositoryTest extends IntegrationTestSupport {

	@Autowired
	private RegionRepository regionRepository;

	@Autowired
	private UserRegionRepository userRegionRepository;

	@BeforeEach
	private void init() {
		userRegionRepository.deleteAllInBatch();
		regionRepository.deleteAllInBatch();
	}

	@DisplayName("Pageable 객체를 받아서 해당 page의 동네 목록을 size개씩 반환한다.")
	@CsvSource(value = {"0,20", "1,20"})
	@ParameterizedTest
	void listAllRegions(int page, int size) {
		// given
		regionRepository.saveAll(FixtureFactory.createRegionFixtures(40));
		Pageable pageable = PageRequest.of(page, size);

		// when
		Slice<Region> regions = regionRepository.findSliceByTitleContaining(pageable, "");

		// then
		assertThat(regions).hasSize(size);
	}

	@DisplayName("다음 데이터가 있다면 true, 없다면 false를 반환한다.")
	@CsvSource(value = {"0,20,true", "1,20,false"})
	@ParameterizedTest
	void hasNext(int page, int size, boolean hasNext) {
		// given
		regionRepository.saveAll(FixtureFactory.createRegionFixtures(40));
		Pageable pageable = PageRequest.of(page, size);

		// when
		Slice<Region> regions = regionRepository.findSliceByTitleContaining(pageable, "");

		// then
		assertThat(regions.hasNext()).isEqualTo(hasNext);
	}

}
