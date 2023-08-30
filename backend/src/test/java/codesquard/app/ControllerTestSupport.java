package codesquard.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.RedisTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import codesquard.app.api.oauth.OauthRestController;
import codesquard.app.api.oauth.OauthService;
import codesquard.app.domain.jwt.JwtProvider;
import codesquard.app.domain.oauth.support.AuthenticationContext;

@WebMvcTest(
	OauthRestController.class
)
public abstract class ControllerTestSupport {

	@MockBean
	protected JwtProvider jwtProvider;

	@Autowired
	protected ObjectMapper objectMapper;

	@MockBean
	protected RedisTemplate<String, Object> redisTemplate;

	@MockBean
	protected OauthService oauthService;

	@MockBean
	protected AuthenticationContext authenticationContext;
}
