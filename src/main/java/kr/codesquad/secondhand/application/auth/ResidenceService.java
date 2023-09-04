package kr.codesquad.secondhand.application.auth;

import kr.codesquad.secondhand.domain.member.Member;
import kr.codesquad.secondhand.domain.residence.Residence;
import kr.codesquad.secondhand.presentation.dto.member.SignUpRequest;
import kr.codesquad.secondhand.repository.residence.ResidenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ResidenceService {

    private final ResidenceRepository residenceRepository;

    @Transactional
    public Residence saveResidence(SignUpRequest request, Member member) {
        return residenceRepository.save(request.toResidenceEntity(member));
    }
}
