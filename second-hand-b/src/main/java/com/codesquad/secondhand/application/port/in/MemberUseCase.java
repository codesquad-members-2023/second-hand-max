package com.codesquad.secondhand.application.port.in;

import com.codesquad.secondhand.application.port.in.response.CategorySimpleDetail;
import com.codesquad.secondhand.application.port.in.response.ProductDetail;
import com.codesquad.secondhand.domain.member.Member;
import java.util.List;

public interface MemberUseCase {

    void toggleProductLikeStatus(Member member, long productId, boolean isLiked);

    List<ProductDetail> fetchMemberFavoriteProducts(Member member, long memberId);

    List<ProductDetail> fetchMemberFavoriteProducts(Member member, long memberId, long categoryId);

    List<CategorySimpleDetail> fetchMemberInterestCategories(Member member, long memberId);

    List<ProductDetail> getMySellingProducts(Member member, long memberId);

    List<ProductDetail> getMySellingProductsByStatus(Member member, long memberId, String statusName);
}
