package com.codesquad.secondhand.adapter.in.web.command.product.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ToggleProductLikeStatusRequest {

    @JsonProperty(value = "isLiked")
    private boolean isLiked;

    public boolean isLiked() {
        return isLiked;
    }
}
