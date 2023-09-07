package kr.codesquad.location.service;

import java.util.ArrayList;
import java.util.List;

import kr.codesquad.location.dto.request.LocationCreateRequest;
import kr.codesquad.location.dto.response.LocationListResponse;
import kr.codesquad.location.entity.Location;
import kr.codesquad.location.repository.LocationRepository;
import kr.codesquad.user.repository.UserRepository;
import kr.codesquad.util.SecretProperties;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
public class LocationService {

    private final LocationRepository locationRepository;
    private final UserRepository userRepository;
    private final String V_WORLD_ENDPOINT;
    private final String V_WORLD_KEY;
    private final String V_WORLD_DOMAIN;

    public LocationService(LocationRepository locationRepository, UserRepository userRepository, SecretProperties secretProperties) {
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
        this.V_WORLD_ENDPOINT = secretProperties.getVworld().getEndpoint();
        this.V_WORLD_KEY = secretProperties.getVworld().getKey();
        this.V_WORLD_DOMAIN = secretProperties.getVworld().getDomain();
    }

    public List<LocationListResponse> getLocations(String query) {

        final String endpoint = V_WORLD_ENDPOINT;
        String key = "&key=" + V_WORLD_KEY;
        String domain = "&domain=" + V_WORLD_DOMAIN;
        String search = "&attrFilter=emd_kor_nm:like:" + query;

        String url = endpoint + key + domain + search;

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);

        List<LocationListResponse> locations = new ArrayList<>();
        int start = 0;
        int end = 0;
        while (true) {
            start = result.indexOf("full_nm", end);
            if (start == -1) {
                break;
            }
            end = result.indexOf(",", start);
            String name = result.substring(start + 10, end - 1);
            Long id = Long.parseLong(result.substring(end + 11, end + 19));
            locations.add(new LocationListResponse(id, name, null));
        }
        return locations;
    }

    @Transactional(readOnly = true)
    public List<LocationListResponse> getMyLocations(String userLoginId) {
        Long userId = userRepository.findIdByLoginId(userLoginId);
        // QueryDSL 로 리팩토링 할 때, 조인 시켜서 한번에 가져오기
        return LocationListResponse.toLocationList(locationRepository.findAllByUserId(userId));
    }

    @Transactional
    public LocationListResponse saveLocation(LocationCreateRequest request, String userLoginId) {
        Long userId = userRepository.findIdByLoginId(userLoginId);
        // QueryDSL 로 리팩토링 할 때, 조인 시켜서 한번에 가져오기
        if (locationRepository.countByUserId(userId) >= 2) {
            throw new RuntimeException("동네는 최대 2개까지만 등록할 수 있습니다");
        }

        return LocationListResponse.of(locationRepository.save(Location.builder()
                .userId(userId)
                .locationId(request.getLocationId())
                .locationName(addressService.getAddress(request.getLocationId()))
                .isSelected(false)
                .build()));
    }

    @Transactional
    public void selectLocation(Long locationId, String userLoginId) {
        Long userId = userRepository.findIdByLoginId(userLoginId);
        // QueryDSL 로 리팩토링 할 때, 조인 시켜서 한번에 가져오기
        List<Location> locations = locationRepository.findAllByUserIdOrderByIsSelectedDesc(userId);

        if (locations.size() == 0) {
            throw new RuntimeException("동네는 최소 1개 이상 등록되어야 합니다");
        }

        for (Location location : locations) {
            if (location.getId().equals(locationId)) {
                location.updateIsSelected(true);
            } else {
                location.updateIsSelected(false);
            }
        }
    }

    @Transactional
    public void deleteLocation(Long locationId, String userLoginId) {
        Long userId = userRepository.findIdByLoginId(userLoginId);
        // QueryDSL 로 리팩토링 할 때, 조인 시켜서 한번에 가져오기
        if (locationRepository.countByUserId(userId) <= 1) {
            throw new RuntimeException("동네는 최소 1개 이상 등록되어야 합니다");
        }

        locationRepository.deleteById(locationId);
    }
}
