package com.codesquad.secondhand.adapter.out.persistence;

import com.codesquad.secondhand.domain.product.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryJpaRepository extends JpaRepository<Category, Long> {

}
