package com.codesquad.secondhand.application.service.in.prodcut;

import com.codesquad.secondhand.application.port.in.response.ImageInfo;
import com.codesquad.secondhand.application.port.in.response.ProductDetail;
import com.codesquad.secondhand.application.port.in.response.ProductWriter;
import com.codesquad.secondhand.application.service.in.image.ImageToImageInfoMapper;
import com.codesquad.secondhand.domain.image.Image;
import com.codesquad.secondhand.domain.member.Member;
import com.codesquad.secondhand.domain.product.Category;
import com.codesquad.secondhand.domain.product.Product;
import com.codesquad.secondhand.domain.product.Status;
import com.codesquad.secondhand.domain.region.Region;
import java.util.List;
import java.util.stream.Collectors;

public class ProductToProductDetailMapper {

    private ProductToProductDetailMapper() {
        throw new UnsupportedOperationException();
    }

    public static ProductDetail map(Product product) {
        Member member = product.getWriter();
        Category category = product.getCategory();
        Region region = product.getRegion();
        Status status = product.getStatus();
        List<Image> images = product.fetchImages();
        List<ImageInfo> imageInfos = images.stream()
                .map(ImageToImageInfoMapper::map)
                .collect(Collectors.toUnmodifiableList());
        return new ProductDetail(product.getId(),
                new ProductWriter(member.getId(), member.getNickname()),
                product.getName(),
                category.getName(),
                region.getName(),
                status.getName(),
                product.getContent(),
                product.getPrice(),
                imageInfos,
                product.getCreatedAt());
    }
}
