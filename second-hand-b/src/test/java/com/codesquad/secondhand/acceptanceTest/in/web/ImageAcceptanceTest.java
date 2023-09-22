package com.codesquad.secondhand.acceptanceTest.in.web;

import static com.codesquad.secondhand.acceptanceTest.in.web.ProductSteps.상품용_이미지를_업로드한다;
import static com.codesquad.secondhand.acceptanceTest.in.web.ProductSteps.이미지를_삭제한다;
import static com.codesquad.secondhand.acceptanceTest.in.web.ProductSteps.회원용_이미지를_업로드한다;
import static com.codesquad.secondhand.utils.RestDocsUtils.출력_필드_추가;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.codesquad.secondhand.utils.AcceptanceTest;
import java.io.File;
import java.io.IOException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;

class ImageAcceptanceTest extends AcceptanceTest {

    @BeforeEach
    public void setS3StorageService() {
        when(s3StorageAdapter.upload(any())).thenReturn("testUrl");
    }

    @Test
    @DisplayName("이미지 업로드 요청을 받으면 이미지 아이디와 S3에 업로드한 이미지 URL을 반환한다.")
    void uploadForProduct() throws IOException {
        출력_필드_추가("image_uploadImageForProduct", spec);

        //when
        String filePath = "/image/test.jpg";
        File file = new ClassPathResource(filePath).getFile();
        var response = 상품용_이미지를_업로드한다(file, ayaanAccessToken, spec);

        //then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.jsonPath().getLong("id")).isEqualTo(1L);
    }

    @Test
    @DisplayName("이미지 업로드 요청을 받으면 S3에 업로드한 이미지 URL을 반환한다.")
    void uploadForMember() throws IOException {
        출력_필드_추가("image_uploadImageForMember", spec);

        //when
        String filePath = "/image/test.jpg";
        File file = new ClassPathResource(filePath).getFile();
        var response = 회원용_이미지를_업로드한다(file, ayaanAccessToken, spec);

        //then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.jsonPath().getString("imgUrl")).isNotNull();
    }

    @Test
    @DisplayName("이미지 삭제 요청을 받으면 이미지를 삭제하고 204 상태코드로 응답한다.")
    void delete() throws IOException {
        출력_필드_추가("image_delete", spec);

        //given
        String filePath = "/image/test.jpg";
        File file = new ClassPathResource(filePath).getFile();
        var uploadImg = 상품용_이미지를_업로드한다(file, ayaanAccessToken);
        Long imgId = uploadImg.jsonPath().getLong("id");

        //when
        var response = 이미지를_삭제한다(imgId, ayaanAccessToken, spec);

        //then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }
}
