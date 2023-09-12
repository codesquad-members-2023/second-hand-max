package com.codesquad.secondhand.domain.region;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import com.codesquad.secondhand.FixtureFactory;
import com.codesquad.secondhand.IntegrationTestSupport;

class RegionRepositoryTest extends IntegrationTestSupport {

	private static final String EMPTY = "";

	@Autowired
	private RegionRepository regionRepository;

	@DisplayName("Pageable 객체를 받아서 해당 page의 동네 목록을 size개씩 반환한다.")
	@CsvSource(value = {"0,20", "1,20"})
	@ParameterizedTest
	void listAllRegions(int page, int size) {
		// given
		regionRepository.saveAll(FixtureFactory.createRegionFixtures(40));
		Pageable pageable = PageRequest.of(page, size);

		// when
		Slice<Region> regions = regionRepository.findSliceByTitleContaining(pageable, EMPTY);

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
		Slice<Region> regions = regionRepository.findSliceByTitleContaining(pageable, EMPTY);

		// then
		assertThat(regions.hasNext()).isEqualTo(hasNext);
	}

	@DisplayName("검색 키워드를 포함하는 동네 목록을 응답합니다.")
	@CsvSource(value = {"0,20,ten,false", "0,20,thirty,true"})
	@ParameterizedTest
	void hasNext(int page, int size, String title, boolean hasNext) {
		// given
		regionRepository.saveAll(FixtureFactory.createRegionFixtures(10, "size ten"));
		regionRepository.saveAll(FixtureFactory.createRegionFixtures(30, "size thirty"));
		Pageable pageable = PageRequest.of(page, size);

		// when
		Slice<Region> regions = regionRepository.findSliceByTitleContaining(pageable, title);

		// then
		assertThat(regions.hasNext()).isEqualTo(hasNext);
	}

}
