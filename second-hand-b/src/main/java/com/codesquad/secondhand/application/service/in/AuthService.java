package com.codesquad.secondhand.application.service.in;

import com.codesquad.secondhand.application.port.in.AuthUseCase;
import com.codesquad.secondhand.application.port.in.exception.MemberNotFoundException;
import com.codesquad.secondhand.application.port.in.exception.NotRegisteredMemberException;
import com.codesquad.secondhand.application.port.in.exception.TokenExpiredException;
import com.codesquad.secondhand.application.port.in.request.SignUpRequest;
import com.codesquad.secondhand.application.port.in.response.Tokens;
import com.codesquad.secondhand.application.port.out.RefreshTokenRepository;
import com.codesquad.secondhand.domain.auth.RefreshToken;
import com.codesquad.secondhand.domain.member.Member;
import com.codesquad.secondhand.domain.member.Role;
import com.codesquad.secondhand.domain.units.JwtTokenProvider;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService implements AuthUseCase {

    private static final int CLEANUP_ROUND_TIME = 5000;
    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    @Override
    public Tokens signIn(String email) {
        Member member = getByEmail(email);
        return getTokens(email, member);
    }

    @Transactional
    @Override
    public Tokens signUp(String email, SignUpRequest signUpRequest) {
        Member member = toMember(email, signUpRequest);
        Member savedMember = memberService.save(member);
        return getTokens(email, savedMember);
    }

    @Override
    public Tokens getAccessToken(String authentication) {
        String token = JwtTokenProvider.parseTokenFromAuthorization(authentication);
        Date now = new Date();
        if (!jwtTokenProvider.validateToken(token, now)) {
            throw new TokenExpiredException();
        }
        String email = jwtTokenProvider.getEmail(token);
        Member member = memberService.findByEmail(email);
        return getTokens(email, member);
    }

    @Scheduled(fixedDelay = CLEANUP_ROUND_TIME)
    public void cleanupExpiredRefreshTokens() {
        Date now = new Date();
        refreshTokenRepository.deleteByExpireTimeBefore(now);
    }

    private Tokens getTokens(String email, Member member) {
        Date startDate = new Date();
        var accessToken = getAccessToken(email, member.getIdStringValue(), startDate);
        var refreshToken = getRefreshToken(email, member, startDate);
        return new Tokens(accessToken, refreshToken);
    }

    private String getAccessToken(String email, String id, Date startDate) {
        Date expiryDate = JwtTokenProvider.getAccessTokenExpiryDate(startDate);
        return jwtTokenProvider.createAccessToken(email, id, startDate, expiryDate);
    }

    private String getRefreshToken(String email, Member member, Date startDate) {
        Date expiryDate = JwtTokenProvider.getRefreshTokenExpiryDate(startDate);
        String refreshToken = jwtTokenProvider.createRefreshToken(email, member.getIdStringValue(), startDate,
                expiryDate);
        refreshTokenRepository.save(new RefreshToken(refreshToken, expiryDate, member, email));
        return refreshToken;
    }

    private Member getByEmail(String email) {
        try {
            return memberService.findByEmail(email);
        } catch (MemberNotFoundException e) {
            throw new NotRegisteredMemberException(jwtTokenProvider.createSignUpToken(email));
        }
    }

    private static Member toMember(String email, SignUpRequest signUpRequest) {
        return new Member(
                email,
                signUpRequest.getNickname(),
                signUpRequest.getProfileImg(),
                null,
                Role.MEMBER
        );
    }
}
