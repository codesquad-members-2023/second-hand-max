package com.codesquad.secondhand.adapter.in.web;

import com.codesquad.secondhand.application.port.in.RegionUseCase;
import com.codesquad.secondhand.adapter.in.web.response.RegionInfos;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/regions")
@RestController
public class RegionController {

    private final RegionUseCase regionUseCase;

    @GetMapping
    public ResponseEntity<RegionInfos> searchRegionsByName(
            @PageableDefault(sort = "id", direction = Direction.ASC) Pageable pageable,
            @RequestParam String word) {
        RegionInfos regionInfos = regionUseCase.searchRegionsByName(word, pageable);
        return ResponseEntity.ok()
                .body(regionInfos);
    }
}
