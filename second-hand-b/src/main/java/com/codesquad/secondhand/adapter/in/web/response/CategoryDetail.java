package com.codesquad.secondhand.adapter.in.web.response;

import lombok.Getter;

@Getter
public class CategoryDetail {

    private Long id;
    private String name;
    private String imgUrl;

    public CategoryDetail(Long id, String name, String imgUrl) {
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
    }
}
