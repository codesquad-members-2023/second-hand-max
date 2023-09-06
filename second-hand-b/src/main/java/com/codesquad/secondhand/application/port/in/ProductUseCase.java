package com.codesquad.secondhand.application.port.in;

import com.codesquad.secondhand.application.port.in.request.ProductCreateRequest;
import com.codesquad.secondhand.application.port.in.request.ProductModifyRequest;
import com.codesquad.secondhand.application.port.in.response.ProductDetail;
import com.codesquad.secondhand.domain.member.Member;

public interface ProductUseCase {

    Long save(ProductCreateRequest productCreateRequest, Member email);

    ProductDetail getDetails(Long id);

    void modify(Long id, ProductModifyRequest productModifyRequest);

    void modifyStatus(Long id, String status);
}
