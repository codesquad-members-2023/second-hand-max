package com.codesquad.secondhand.adapter.in.web;

import static com.codesquad.secondhand.adapter.in.web.MemberRegionSteps.멤버의_지역을_삭제한다;
import static com.codesquad.secondhand.adapter.in.web.MemberRegionSteps.멤버의_지역을_추가한다;
import static org.assertj.core.api.Assertions.assertThat;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.HttpStatus;

@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
class MemberRegionControllerTest {

    @Test
    @DisplayName("멤버에 대한 지역 추가 요청을 받으면 요청을 수행하고 201 상태코드로 응답한다.")
    void addRegionToMember() {
        //given
        // TODO: 멤버 생성, 지역 생성 추가
        Long memberId = 1L;
        Long regionId = 1L;

        //when
        var response = 멤버의_지역을_추가한다(memberId, regionId);

        //then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
    }

    @Test
    @DisplayName("멤버의 지역 삭제 요청을 받으면 요청을 수행하고 204 상태코드로 응답한다.")
    void removeRegionFromMember() {
        //given
        Long memberId = 1L;
        Long regionId = 1L;
        멤버의_지역을_추가한다(memberId, regionId);

        //when
        var response = 멤버의_지역을_삭제한다(memberId, regionId);

        //then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    @Test
    @DisplayName("멤버의 지역 목록 조회 요청을 받으면 멤버의 지역 목록을 반환한다.")
    void getRegionsOfMember() {
        //given
        Long memberId = 1L;
        Long regionId = 1L;
        멤버의_지역을_추가한다(memberId, regionId);

        //when
        ExtractableResponse<Response> response = RestAssured.given().log().all()
                .when().get("/api/members/{memberId}/regions", memberId)
                .then().log().all().extract();

        //then
        Assertions.assertAll(
                () -> assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value()),
                () -> assertThat(response.jsonPath().getLong("selectedRegionId")).isEqualTo(1L),
                () -> assertThat(response.jsonPath().getList("regions.id")).contains(1L)
        );
    }
}
