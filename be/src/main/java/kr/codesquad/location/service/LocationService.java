package kr.codesquad.location.service;

import java.util.ArrayList;
import java.util.List;

import kr.codesquad.location.dto.response.LocationListResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LocationService {

    public static List<LocationListResponse> getLocations(String query) {

        final String API_URL = "https://api.vworld.kr/req/data";
        String key = "E6435510-7BE8-3FB3-B456-9A65D1E5CA36";
        String domain = "http://hyowon.site";
        String data = "LT_C_ADEMD_INFO";
        String request = "GetFeature";
        String geometry = "false";
        String attrFilter = "emd_kor_nm:like:" + query;

        String url = API_URL + "?service=data&request=" + request + "&key=" + key + "&domain=" + domain + "&data=" + data
                + "&attrFilter=" + attrFilter + "&geometry=" + geometry;

        RestTemplate restTemplate = new RestTemplate();

        Object result = restTemplate.getForObject(url, Object.class);


        String resultString = result.toString();


        List<LocationListResponse> locations = new ArrayList<>();

        int start = 0;
        int end = 0;

        while (true) {
            start = resultString.indexOf("full_nm=", end);
            if (start == -1) {
                break;
            }
            end = resultString.indexOf(",", start);
            String temp = resultString.substring(start + 8, end);
            locations.add(new LocationListResponse(null, temp, null));
        }

        return locations;
    }
}
