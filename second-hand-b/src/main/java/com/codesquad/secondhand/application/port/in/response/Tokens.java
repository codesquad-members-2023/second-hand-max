package com.codesquad.secondhand.application.port.in.response;

public class Tokens {

    private final String accessToken;
    private final String refreshToken;
    private final long memberId;

    public Tokens(String accessToken, String refreshToken, Long memberId) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.memberId = memberId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public long getMemberId() {
        return memberId;
    }
}
