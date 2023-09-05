package com.codesquad.secondhand.adapter.in.web;

import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품등록을_검증한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품상세를_조회한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품상세조회를_검증한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품상태를_수정한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품상태수정을_검증한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품수정을_검증한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품을_등록한다;
import static com.codesquad.secondhand.adapter.in.web.ProductSteps.상품을_수정한다;

import com.codesquad.secondhand.utils.AcceptanceTest;
import java.io.IOException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ProductControllerTest extends AcceptanceTest {

    @Test
    @DisplayName("상품 등록 요청이 오면 상품 아이디를 반환한다.")
    void create() throws IOException {
        var response = 상품을_등록한다(ayaanAccessToken);

        상품등록을_검증한다(response);
    }

    @Test
    @DisplayName("상품 상세 조회 요청이 오면 상품 상세 정보를 반환한다.")
    void getDetails() throws IOException {
        // given
        Long id = 상품을_등록한다(ayaanAccessToken).jsonPath().getLong("id");
        // when
        var response = 상품상세를_조회한다(id, ayaanAccessToken);
        // then
        상품상세조회를_검증한다(response);
    }

    @Test
    @DisplayName("상품 수정 요청이 오면 상품 정보를 수정한다.")
    void modify() throws IOException {
        //given
        Long id = 상품을_등록한다(ayaanAccessToken).jsonPath().getLong("id");

        // when
        var response = 상품을_수정한다(id, ayaanAccessToken);

        //then
        상품수정을_검증한다(id, ayaanAccessToken, response);
    }

    @Test
    @DisplayName("상품 상태 수정 요청이 오면 상품 상태를 수정한다.")
    void modifyStatus() throws IOException {
        //given
        Long id = 상품을_등록한다(ayaanAccessToken).jsonPath().getLong("id");

        //when
        var response = 상품상태를_수정한다(id, ayaanAccessToken);

        //then
        상품상태수정을_검증한다(id, ayaanAccessToken, response);
    }
}
