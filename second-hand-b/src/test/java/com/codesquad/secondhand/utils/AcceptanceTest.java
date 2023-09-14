package com.codesquad.secondhand.utils;

import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.documentationConfiguration;

import com.codesquad.secondhand.adapter.out.s3.S3StorageService;
import com.codesquad.secondhand.application.port.out.MemberRepository;
import com.codesquad.secondhand.application.port.out.RegionRepository;
import com.codesquad.secondhand.domain.member.Member;
import com.codesquad.secondhand.domain.member.Role;
import com.codesquad.secondhand.domain.region.Region;
import com.codesquad.secondhand.domain.units.JwtTokenProvider;
import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.specification.RequestSpecification;
import java.util.Date;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@ExtendWith(RestDocumentationExtension.class)
public abstract class AcceptanceTest {

    public static final String AYAAN_EMAIL = "ayaan@email.com";
    public static final String AYAAN_NICKNAME = "이안";
    public static final String AYAAN_PROFILE_IMAGE = "url";
    public static final long AYAAN_DEFAULT_REGION_ID = 3L;
    public static final String ALBERT_EMAIL = "albert@email.com";
    public static final String ALBERT_NICKNAME = "앨버트";
    public static final String ALBERT_PROFILE_IMAGE = "url";
    public static final long ALBERT_DEFAULT_REGION_ID = 1L;
    public String ayaanAccessToken;
    public String albertAccessToken;
    @MockBean
    public S3StorageService s3StorageService;
    @LocalServerPort
    private int port;
    @Autowired
    private DatabaseCleanup databaseCleanup;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private RegionRepository regionRepository;
    protected RequestSpecification spec;

    @BeforeEach
    public void setUp(RestDocumentationContextProvider restDocumentation) {
        RestAssured.port = port;
        databaseCleanup.execute();
        initAccessToken();
        this.spec = new RequestSpecBuilder()
                .addFilter(documentationConfiguration(restDocumentation))
                .build();
    }

    private void initAccessToken() {
        Member ayaanMember = new Member(AYAAN_EMAIL, AYAAN_NICKNAME, AYAAN_PROFILE_IMAGE, Role.MEMBER);
        Region ayyanRegion = regionRepository.findById(AYAAN_DEFAULT_REGION_ID).orElseThrow();
        ayaanMember.addRegion(ayyanRegion);
        ayaanMember.selectRegion(ayyanRegion);
        Member ayaan = memberRepository.save(ayaanMember);

        Member albertMember = new Member(ALBERT_EMAIL, ALBERT_NICKNAME, ALBERT_PROFILE_IMAGE, Role.MEMBER);
        Region albertRegion = regionRepository.findById(ALBERT_DEFAULT_REGION_ID).orElseThrow();
        albertMember.addRegion(albertRegion);
        albertMember.selectRegion(albertRegion);
        Member albert = memberRepository.save(albertMember);

        final Date startDate = new Date();
        ayaanAccessToken = JwtTokenProvider.createAccessToken(AYAAN_EMAIL, ayaan.getIdStringValue(), startDate);
        albertAccessToken = JwtTokenProvider.createAccessToken(ALBERT_EMAIL, albert.getIdStringValue(), startDate);
    }
}
