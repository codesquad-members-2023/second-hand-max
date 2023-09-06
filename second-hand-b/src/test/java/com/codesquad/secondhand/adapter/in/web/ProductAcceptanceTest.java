package com.codesquad.secondhand.adapter.in.web;

import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품등록을_검증한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품상세를_조회한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품상세조회를_검증한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품상태를_수정한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품상태수정을_검증한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품수정을_검증한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품을_등록한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품을_수정한다;
import static org.assertj.core.api.Assertions.assertThat;

import com.codesquad.secondhand.utils.AcceptanceTest;
import io.restassured.RestAssured;
import java.io.IOException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ProductAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("상품 등록 요청이 오면 상품 아이디를 반환한다.")
    void create() throws IOException {
        var response = 상품을_등록한다(ayaanAccessToken, 1);

        상품등록을_검증한다(response);
    }

    @Test
    @DisplayName("상품 상세 조회 요청이 오면 상품 상세 정보를 반환한다.")
    void getDetails() throws IOException {
        // given
        Long id = 상품을_등록한다(ayaanAccessToken, 1).jsonPath().getLong("id");
        // when
        var response = 상품상세를_조회한다(id, ayaanAccessToken);
        // then
        상품상세조회를_검증한다(response);
    }

    @Test
    @DisplayName("상품 수정 요청이 오면 상품 정보를 수정한다.")
    void modify() throws IOException {
        //given
        Long id = 상품을_등록한다(ayaanAccessToken, 1).jsonPath().getLong("id");

        // when
        var response = 상품을_수정한다(id, ayaanAccessToken);

        //then
        상품수정을_검증한다(id, ayaanAccessToken, response);
    }

    @Test
    @DisplayName("상품 상태 수정 요청이 오면 상품 상태를 수정한다.")
    void modifyStatus() throws IOException {
        //given
        Long id = 상품을_등록한다(ayaanAccessToken, 1).jsonPath().getLong("id");

        //when
        var response = 상품상태를_수정한다(id, ayaanAccessToken);

        //then
        상품상태수정을_검증한다(id, ayaanAccessToken, response);
    }

    @Test
    @DisplayName("지역에 해당하는 상품 목록을 조회하여 반환한다.")
    void getProductListByRegion() {
        //given
        상품을_등록한다(ayaanAccessToken, 1);
        상품을_등록한다(ayaanAccessToken, 2);
        Long regionId = 1L;

        //when
        var response = RestAssured.given().log().all()
                .queryParam("regionId", regionId)
                .auth().oauth2(ayaanAccessToken)
                .when().get("/api/products")
                .then().log().all().extract();

        //then
        Assertions.assertAll(
                () -> assertThat(response.jsonPath().getList(".")).hasSize(2),
                () -> assertThat(response.jsonPath().getList("id")).containsExactly(1, 2)
        );
    }

    @Test
    @DisplayName("지역과 카테고리에 해당하는 상품 목록을 조회하여 반환한다.")
    void getProductListByRegionAndCategory() {
        //given
        상품을_등록한다(ayaanAccessToken, 1);
        상품을_등록한다(ayaanAccessToken, 2);
        상품을_등록한다(ayaanAccessToken, 2);
        Long regionId = 1L;
        Long categoryId = 2L;

        //when
        var response = RestAssured.given().log().all()
                .queryParam("regionId", regionId)
                .queryParam("categoryId", categoryId)
                .auth().oauth2(ayaanAccessToken)
                .when().get("/api/products")
                .then().log().all().extract();

        //then
        Assertions.assertAll(
                () -> assertThat(response.jsonPath().getList(".")).hasSize(2),
                () -> assertThat(response.jsonPath().getList("id")).containsExactly(2, 3)
        );
    }
}
