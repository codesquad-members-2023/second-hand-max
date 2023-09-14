package com.codesquad.secondhand.application.service.in;

import com.codesquad.secondhand.adapter.in.web.request.SignUpRequest;
import com.codesquad.secondhand.adapter.in.web.response.Tokens;
import com.codesquad.secondhand.application.port.in.AuthUseCase;
import com.codesquad.secondhand.application.port.out.RefreshTokenRepository;
import com.codesquad.secondhand.application.service.in.exception.MemberNotFoundException;
import com.codesquad.secondhand.application.service.in.exception.NotRegisteredMemberException;
import com.codesquad.secondhand.domain.auth.RefreshToken;
import com.codesquad.secondhand.domain.member.Member;
import com.codesquad.secondhand.domain.member.Role;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.units.JwtTokenProvider;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService implements AuthUseCase {

    private static final int REGIONS_FIRST_INDEX = 0;
    private static final int REGIONS_SECOND_INDEX = 1;
    private static final int CLEANUP_ROUND_TIME = 5000;
    private final MemberService memberService;
    private final RegionService regionService;
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
        JwtTokenProvider.validate(token, now);
        String email = JwtTokenProvider.getEmail(token);
        Member member = memberService.getByEmail(email);
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
        return new Tokens(accessToken, refreshToken, member.getId());
    }

    private String getAccessToken(String email, String id, Date startDate) {
        return JwtTokenProvider.createAccessToken(email, id, startDate);
    }

    private String getRefreshToken(String email, Member member, Date startDate) {
        Date expiryDate = JwtTokenProvider.getRefreshTokenExpiryDate(startDate);
        String refreshToken = JwtTokenProvider.createRefreshToken(email, member.getIdStringValue(), startDate);
        refreshTokenRepository.save(new RefreshToken(refreshToken, expiryDate, member, email));
        return refreshToken;
    }

    private Member getByEmail(String email) {
        try {
            return memberService.getByEmail(email);
        } catch (MemberNotFoundException e) {
            throw new NotRegisteredMemberException();
        }
    }

    private Member toMember(String email, SignUpRequest signUpRequest) {
        List<Long> regionsId = signUpRequest.getRegionsId();
        Region region1 = regionService.getById(regionsId.get(REGIONS_FIRST_INDEX));
        Member member = new Member(
                email,
                signUpRequest.getNickname(),
                signUpRequest.getProfileImg(),
                region1,
                Role.MEMBER
        );
        if (regionsId.size() > 1) {
            Region region2 = regionService.getById(regionsId.get(REGIONS_SECOND_INDEX));
            member.addRegion(region2);
        }
        return member;
    }
}
