package com.codesquad.secondhand.application.service.in;


import com.codesquad.secondhand.application.port.in.MemberRegionUseCase;
import com.codesquad.secondhand.application.port.out.MemberRepository;
import com.codesquad.secondhand.application.port.out.RegionRepository;
import com.codesquad.secondhand.domain.member.Member;
import com.codesquad.secondhand.domain.region.Region;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberRegionService implements MemberRegionUseCase {

    private final MemberRepository memberRepository;
    private final RegionRepository regionRepository;

    @Transactional
    @Override
    public void addRegionToMember(Long memberId, Long regionId) {
        Member member = memberRepository.findById(memberId).orElseThrow();
        Region region = regionRepository.findById(regionId).orElseThrow();
        member.addRegion(region);
    }
}
