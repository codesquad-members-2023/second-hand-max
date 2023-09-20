package com.codesquad.secondhand.adapter.in.web;

import static org.assertj.core.api.Assertions.assertThat;

import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Assertions;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

public class MemberSteps {

    public static void 관심상품은_담은_응답_검증(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    public static ExtractableResponse<Response> 관심상품에_담는다(String id, String accessToken) {
        return 관심상품에_담는다(id, accessToken, new RequestSpecBuilder().build());
    }

    public static ExtractableResponse<Response> 관심상품에_담는다(String id, String accessToken,
            RequestSpecification specification) {
        Map<String, Boolean> body = new HashMap<>();
        body.put("isLiked", true);
        return RestAssured.given().log().all()
                .spec(specification)
                .auth().oauth2(accessToken)
                .body(body).contentType(MediaType.APPLICATION_JSON_VALUE)
                .when().put("/api/products/{productId}/likes", id)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 관심상품에_제거한다(String id, String accessToken,
            RequestSpecification specification) {
        Map<String, Boolean> body = new HashMap<>();
        body.put("liked", false);
        return RestAssured.given().log().all()
                .spec(specification)
                .auth().oauth2(accessToken)
                .body(body).contentType(MediaType.APPLICATION_JSON_VALUE)
                .when().put("/api/products/{productId}/likes", id)
                .then().log().all()
                .extract();
    }

    public static void 나의_관심상품_목록_조회_검증한다(ExtractableResponse<Response> response) {
        Assertions.assertAll(
                () -> assertThat(response.jsonPath().getList("products.id", String.class))
                        .containsExactlyInAnyOrder("1", "2"),
                () -> assertThat(response.jsonPath().getObject("hasNext", Boolean.class)).isNotNull(),
                () -> assertThat(response.jsonPath().getObject("page", Long.class)).isNotNull()
        );
    }

    public static void 나의_카테고리별_관심상품_목록_조회_결과_검증한다(ExtractableResponse<Response> response) {
        Assertions.assertAll(
                () -> assertThat(response.jsonPath().getList("products.id", String.class))
                        .containsExactlyInAnyOrder("1"),
                () -> assertThat(response.jsonPath().getObject("hasNext", Boolean.class)).isNotNull(),
                () -> assertThat(response.jsonPath().getObject("page", Long.class)).isNotNull()
        );
    }

    public static void 나의_관심상품의_카테고리_목록_조회_결과_검증한다(ExtractableResponse<Response> response) {
        assertThat(response.jsonPath().getList("id", String.class))
                .containsExactlyInAnyOrder("1", "2");
    }

    public static void 나의_판매상품의_목록_조회_결과_검증한다(ExtractableResponse<Response> response) {
        Assertions.assertAll(
                () -> assertThat(response.jsonPath().getList("products.id", String.class))
                        .containsExactlyInAnyOrder("1", "2"),
                () -> assertThat(response.jsonPath().getObject("hasNext", Boolean.class)).isNotNull(),
                () -> assertThat(response.jsonPath().getObject("page", Long.class)).isNotNull()
        );
    }

    public static void 나의_상태별_판매상품의_목록_조회_결과_검증한다(ExtractableResponse<Response> response) {
        Assertions.assertAll(
                () -> assertThat(response.jsonPath().getList("products.id", String.class))
                        .containsExactlyInAnyOrder("1"),
                () -> assertThat(response.jsonPath().getObject("hasNext", Boolean.class)).isNotNull(),
                () -> assertThat(response.jsonPath().getObject("page", Long.class)).isNotNull()
        );
    }

    public static ExtractableResponse<Response> 나의_관심상품_목록_조회한다(String accessToken,
            RequestSpecification specification) {
        return RestAssured.given().log().all()
                .spec(specification)
                .auth().oauth2(accessToken)
                .when().get("/api/members/{memberId}/likes", 2)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 나의_관심상품_목록_조회한다(String accessToken, int categoryId,
            RequestSpecification specification) {
        return RestAssured.given().log().all()
                .spec(specification)
                .auth().oauth2(accessToken).param("categoryId", categoryId)
                .when().get("/api/members/{memberId}/likes", 2)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 나의_관심상품의_카테고리_목록_조회한다(String accessToken,
            RequestSpecification specification) {
        return RestAssured.given().log().all()
                .spec(specification)
                .auth().oauth2(accessToken)
                .when().get("/api/members/{memberId}/likes/categories", 2)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 나의_판매상품_목록_조회한다(String accessToken,
            RequestSpecification specification) {
        return RestAssured.given().log().all()
                .spec(specification)
                .auth().oauth2(accessToken)
                .when().get("/api/members/{memberId}/sales", 1)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 나의_판매상품_목록을_상태별_조회한다(String accessToken, String status,
            RequestSpecification specification) {
        return RestAssured.given().log().all()
                .spec(specification)
                .auth().oauth2(accessToken).param("status", status)
                .when().get("/api/members/{memberId}/sales", 1)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 멤버의_정보를_요청한다(Long memberId, String accessToken,
            RequestSpecification specification) {
        return RestAssured.given().log().all()
                .spec(specification)
                .auth().oauth2(accessToken)
                .when().get("/api/members/{memberId}", memberId)
                .then().log().all().extract();
    }

    public static void 멤버정보_요청을_검증한다(ExtractableResponse<Response> response) {
        assertThat(response.jsonPath().getLong("id")).isEqualTo(1);
        assertThat(response.jsonPath().getString("nickname")).isEqualTo("이안");
        assertThat(response.jsonPath().getString("profileImg")).isEqualTo("url");
    }
}
