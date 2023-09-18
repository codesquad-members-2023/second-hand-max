package com.codesquad.secondhand.application.service.in.prodcut;

import static com.codesquad.secondhand.domain.product.ProductTestUtils.getDefaultTestWriter;
import static org.assertj.core.api.Assertions.assertThat;

import com.codesquad.secondhand.adapter.in.web.response.ImageInfo;
import com.codesquad.secondhand.adapter.in.web.response.ProductDetail;
import com.codesquad.secondhand.adapter.in.web.response.ProductInfo;
import com.codesquad.secondhand.adapter.in.web.response.ProductWriter;
import com.codesquad.secondhand.application.service.in.image.ImageMapper;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.member.Member;
import com.codesquad.secondhand.domain.product.Product;
import com.codesquad.secondhand.domain.product.ProductTestUtils;
import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ProductMapperTest {

    @DisplayName("Product로 ProductInfo를 만든다")
    @Test
    void toProductInfo() {
        // given
        Product product = ProductTestUtils.createTestProduct();

        // when
        ProductInfo targetProductInfo = ProductMapper.toProductInfo(product);

        // then
        validateMapToProductInfo(targetProductInfo, product);
    }

    @DisplayName("Product로 ProductDetail를 만든다")
    @Test
    void toProductDetail() {
        // given
        Product product = ProductTestUtils.createTestProduct();
        Member member = getDefaultTestWriter();

        // when
        ProductDetail productDetail = ProductMapper.toProductDetail(product, member);

        // then
        validateToProductDetail(product, member, productDetail);
    }

    private static void validateToProductDetail(Product product, Member member, ProductDetail productDetail) {
        ProductWriter productWriter = new ProductWriter(member.getId(), member.getNickname());
        List<Image> images = product.fetchImages();
        List<ImageInfo> imageInfos = ImageMapper.toImageInfos(images);
        Assertions.assertAll(
                () -> assertThat(productDetail.getId()).isEqualTo(product.getId()),
                () -> assertThat(productDetail.getWriter()).usingRecursiveComparison().isEqualTo(productWriter),
                () -> assertThat(productDetail.getProductName()).isEqualTo(product.getName()),
                () -> assertThat(productDetail.getCategoryName()).isEqualTo(product.getCategory().getName()),
                () -> assertThat(productDetail.getRegionName()).isEqualTo(product.getRegion().getName()),
                () -> assertThat(productDetail.getStatus()).isEqualTo(product.getStatus().getName()),
                () -> assertThat(productDetail.getContent()).isEqualTo(product.getContent()),
                () -> assertThat(productDetail.getPrice()).isEqualTo(product.getPrice()),
                () -> assertThat(productDetail.getImages()).usingRecursiveComparison().isEqualTo(imageInfos),
                () -> assertThat(productDetail.getCreatedAt()).isEqualTo(product.getCreatedAt())
        );
    }

    private static void validateMapToProductInfo(ProductInfo targetProductInfo, Product product) {
        Assertions.assertAll(
                () -> assertThat(targetProductInfo.getId()).isEqualTo(product.getId()),
                () -> assertThat(targetProductInfo.getWriterId()).isEqualTo(product.getWriterId()),
                () -> assertThat(targetProductInfo.getThumbnailUrl()).isEqualTo(product.getThumbnailUrl()),
                () -> assertThat(targetProductInfo.getName()).isEqualTo(product.getName()),
                () -> assertThat(targetProductInfo.getRegion()).isEqualTo(product.getRegion().getName()),
                () -> assertThat(targetProductInfo.getCreatedAt()).isEqualTo(product.getCreatedAt()),
                () -> assertThat(targetProductInfo.getStatus()).isEqualTo(product.getStatus().getName()),
                () -> assertThat(targetProductInfo.getPrice()).isEqualTo(product.getPrice()),
                () -> assertThat(targetProductInfo.getLikeCount()).isEqualTo(0),
                () -> assertThat(targetProductInfo.getChattingCount()).isEqualTo(0)
        );
    }
}
