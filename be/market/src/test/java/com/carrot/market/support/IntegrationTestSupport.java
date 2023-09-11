package com.carrot.market.support;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

@TestPropertySource(properties = "app.scheduling.enable=false")
@Transactional
@ActiveProfiles("test")
@SpringBootTest
public abstract class IntegrationTestSupport {
}
