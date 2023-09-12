package com.codesquad.secondhand.adapter.out.persistence;

import com.codesquad.secondhand.adapter.out.persistence.imports.RefreshTokenCrudRepository;
import com.codesquad.secondhand.application.port.out.RefreshTokenRepository;
import com.codesquad.secondhand.domain.auth.RefreshToken;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class RefreshTokenRepositoryImpl implements RefreshTokenRepository {

    private final RefreshTokenCrudRepository refreshTokenCrudRepository;

    @Override
    public RefreshToken save(RefreshToken refreshToken) {
        return refreshTokenCrudRepository.save(refreshToken);
    }

    @Override
    public void deleteByExpireTimeBefore(Date date) {
        refreshTokenCrudRepository.deleteByExpireTimeBefore(date);
    }
}
