package com.codesquad.secondhand.query.service;

import static com.codesquad.secondhand.common.utils.ProductMapper.toProductDetail;
import static com.codesquad.secondhand.common.utils.ProductMapper.toProductInfo;

import com.codesquad.secondhand.command.domain.member.Member;
import com.codesquad.secondhand.command.domain.product.Category;
import com.codesquad.secondhand.command.domain.product.Product;
import com.codesquad.secondhand.command.domain.region.Region;
import com.codesquad.secondhand.query.controller.prodcut.response.ProductDetail;
import com.codesquad.secondhand.query.controller.prodcut.response.ProductInfo;
import com.codesquad.secondhand.query.controller.prodcut.response.ProductsInfo;
import com.codesquad.secondhand.query.port.ProductQueryUseCase;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Component
public class ProductQueryFacade implements ProductQueryUseCase {

    private final ProductQueryService productQueryService;
    private final RegionQueryService regionQueryService;
    private final MemberQueryService memberQueryService;

    @Transactional
    @Override
    public ProductDetail getDetails(long id) {
        Product product = productQueryService.getById(id);
        long writerId = product.getWriterId();
        Member member = memberQueryService.getById(writerId);
        Category category = product.getCategory();
        long regionId = product.getRegionId();
        Region region = regionQueryService.getById(regionId);
        return toProductDetail(product, category, member, region);
    }

    @Transactional(readOnly = true)
    @Override
    public ProductsInfo getProductsByRegion(long regionId, Pageable pageable) {
        Slice<Product> products = productQueryService.getProductsByRegion(regionId, pageable);
        return toProductsInfo(products);
    }

    @Transactional(readOnly = true)
    @Override
    public ProductsInfo getProductsByRegionAndCategory(long regionId, long categoryId, Pageable pageable) {
        Slice<Product> products = productQueryService.getProductsByRegionAndCategory(regionId, categoryId, pageable);
        return toProductsInfo(products);
    }

    private ProductsInfo toProductsInfo(Slice<Product> products) {
        List<ProductInfo> productInfoList = products.stream()
                .map(product -> toProductInfo(product, regionQueryService.getById(product.getRegionId())))
                .collect(Collectors.toList());
        return new ProductsInfo(productInfoList, products.hasNext(), products.getNumber());
    }
}
