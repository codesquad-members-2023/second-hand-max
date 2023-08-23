package com.codesquad.secondhand.domain.region;

import static org.assertj.core.api.Assertions.*;

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
import org.springframework.data.domain.Slice;

import com.codesquad.secondhand.IntegrationTestSupport;

class RegionRepositoryTest extends IntegrationTestSupport {

	@Autowired
	private RegionRepository regionRepository;

	@BeforeEach
	private void init() {
		regionRepository.deleteAllInBatch();
	}

	@DisplayName("Pageable 객체를 받아서 해당 page의 동네 목록을 size개씩 반환한다.")
	@CsvSource(value = {"0,20", "1,20"})
	@ParameterizedTest
	void listAllRegions(int page, int size) {
		// given
		createRegionFixture(40);
		Pageable pageable = PageRequest.of(page, size);

		// when
		Slice<Region> regions = regionRepository.findSliceBy(pageable);

		// then
		assertThat(regions).hasSize(size);
	}

	@DisplayName("다음 데이터가 있다면 true, 없다면 false를 반환한다.")
	@CsvSource(value = {"0,20,true", "1,20,false"})
	@ParameterizedTest
	void hasNext(int page, int size, boolean hasNext) {
		// given
		createRegionFixture(40);
		Pageable pageable = PageRequest.of(page, size);

		// when
		Slice<Region> regions = regionRepository.findSliceBy(pageable);

		// then
		assertThat(regions.hasNext()).isEqualTo(hasNext);
	}

	private void createRegionFixture(int size) {
		List<Region> regions = IntStream.rangeClosed(1, size)
			.mapToObj(i -> new Region(null, "test region" + i))
			.collect(Collectors.toList());
		regionRepository.saveAll(regions);
	}

}
