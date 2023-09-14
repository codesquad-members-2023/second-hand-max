-- INSERT INTO item(created_at, category_id, content, location_id, location_name, price, status, thumbnail_url,
--                  title, user_id, view_count)
-- values (NOW(), 1, '콘텐츠', 1, '역삼1동', 1000, 1, '썸네일url', '제목', 1, 3);

INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '치이카와 시계', 1, '역삼 1동', 1000, 1,
        'https://cokkiri-s3.s3.ap-northeast-2.amazonaws.com/itemImage/%E1%84%8E%E1%85%B5%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%A1%E1%84%8B%E1%85%AA.jpg',
        '치이카와 시계 가챠', 1, 3);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '깨진 아이폰', 1, '역삼 1동', 20000, 3,
        'https://cokkiri-s3.s3.ap-northeast-2.amazonaws.com/itemImage/449ff2ba-e3de-475d-9d9c-9106dab77e5e%E1%84%81%E1%85%A2%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AB.webp',
        '깨진 아이폰', 1, 5);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '자전거 팝니다', 1, '역삼 1동', 30000, 2,
        'https://cokkiri-s3.s3.ap-northeast-2.amazonaws.com/itemImage/1aed215c-ae1d-4ca5-8774-3ee846c9f3ef%E1%84%8C%E1%85%A1%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%80%E1%85%A5.jpeg',
        '저전거 팝니다', 1, 10);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '댕댕이 산책', 1, '역삼 1동', 0, 1,
        'https://cokkiri-s3.s3.ap-northeast-2.amazonaws.com/itemImage/245c318c-5d97-4913-bf36-e7b4588037881527857574711(1).jpg',
        '댕댕이 산책 알바 구합니다', 1, 32);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `status`,
                                  `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '그림', 1, '역삼 1동', 1,
        'https://cokkiri-s3.s3.ap-northeast-2.amazonaws.com/itemImage/9104c74c-7e5f-4fd5-8b3b-1816b279fd6d%E1%84%8C%E1%85%B5%E1%84%8B%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A9%E1%84%8B%E1%85%A3%E1%86%BC%E1%84%8B%E1%85%B5.jpeg',
        '그림 그려드려요', 1, 80);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `status`,
                                  `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '먹태깡 ', 1, '역삼 1동', 1,
        'https://cokkiri-s3.s3.ap-northeast-2.amazonaws.com/itemImage/937feb28-7b56-4a5e-884e-212c213deab1%E1%84%86%E1%85%A5%E1%86%A8%E1%84%90%E1%85%A2%E1%84%81%E1%85%A1%E1%86%BC.webp',
        '맛있겠쥬~?', 1, 2);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `status`,
                                  `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '기타', 1, '역삼 1동', 1,
        'https://cokkiri-s3.s3.ap-northeast-2.amazonaws.com/itemImage/b516cbef-d404-4e54-af43-64bc0b9cda5e%E1%84%80%E1%85%B5%E1%84%90%E1%85%A1.webp',
        '기타 레슨 합니다', 1, 6278);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `status`,
                                  `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '바람막이', 1, '역삼 1동', 2,
        'https://cokkiri-s3.s3.ap-northeast-2.amazonaws.com/itemImage/d4c60c3b-3c73-4942-ac79-dc3b9540e4ce%E1%84%87%E1%85%A1%E1%84%85%E1%85%A1%E1%86%B7%E1%84%86%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%B5.webp',
        '마음의 바람도 막아주는 바람막이 팝니다', 1, 752);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `status`,
                                  `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '오카리나', 1, '역삼 1동', 1,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-cCFrzzWEsBbqu4hSnFXuoGEqyav1o2RPzSGN7Zc0LUlljFxRyollth5jfiK_W85mcc&usqp=CAU',
        '오카리나 팝니다', 1, 3);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '젤다 갓 겜', 1, '역삼 1동', 30000, 3,
        'https://upload.wikimedia.org/wikipedia/ko/thumb/c/cf/%EB%B8%8C%EB%A0%88%EC%8A%A4_%EC%98%A4%EB%B8%8C_%EB%8D%94_%EC%99%80%EC%9D%BC%EB%93%9C.jpg/230px-%EB%B8%8C%EB%A0%88%EC%8A%A4_%EC%98%A4%EB%B8%8C_%EB%8D%94_%EC%99%80%EC%9D%BC%EB%93%9C.jpg',
        '젤다의 전설 야생의 숨결 DLC 팝니다', 1, 7682);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '미파', 1, '역삼 1동', 620000, 1,
        'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5581146608/B.jpg?871000000',
        '젤다의 전설 미파 피규어 팝니다', 1, 235243);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '닌텐도', 1, '역삼 1동', 1354000, 1,
        'https://i.namu.wiki/i/dTxWry1hO7uw43fr05d2krIZhQH_-fAoqSpBqkQHdDoV-baWRZKj9hf4b-A0fhynBv7fGT6lr5Fm2y2uFzICuQ.webp',
        '닌텐도 스위치 미개봉 박스 포함', 1, 634);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '동숲', 1, '역삼 1동', 62000, 2,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkLYT0B9A3I3f3XI5Fk0KLUWY1Z7NNWRLRgXxpgl7plq7R46GP5SyeRxWmkGc_658vHg0&usqp=CAU',
        '모여봐요 동물의 숲 닌텐도 칩 팝니다', 1, 6);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '에버랜드', 1, '역삼 1동', 33000, 2,
        'https://mblogthumb-phinf.pstatic.net/MjAxOTA2MjJfOTcg/MDAxNTYxMjE1MDg1MzE3.b9bmlLhCuWObP3CGAi8QRCdCoh7q6gee2DPakFbdjQcg.DI_4hVsA_YmI5ccFn5sxYZBtMUEosmXNoKu1Ot1Adrog.JPEG.142819xx/DSCF9481.JPG?type=w800',
        '에버랜드 주말 3인 티켓 팝니다', 1, 6202);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '고양이 모래', 1, '역삼 1동', 20000, 1,
        'https://img.biteme.co.kr/product/750/ffae80f3f9316e065c7afda2fe42ca08.jpg',
        '고양이 모래 팝니다', 1, 243);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '로열티', 1, '역삼 1동', 42300, 3,
        'https://coresos-phinf.pstatic.net/a/30geij/b_935Ud018svc1yx83yuky31_hrcm5e.jpg?type=cover_a640',
        '열대어 로열티 분양합니다', 1, 32);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '모자', 1, '역삼 1동', 2000, 1,
        'https://webimage.10x10.co.kr/image/basic600/244/B002446586.jpg',
        '핵인싸템 모자 팝니다', 1, 432);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '티모', 1, '역삼 1동', 203500, 2,
        'https://m.thesuperplay.com/web/product/big/202211/b4e8dd4e6d8b3f852897cbb10a0f4e89.png',
        '티모 티티모! 킹받는 모자!', 1, 32);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '신발', 1, '역삼 1동', 23400, 3,
        'https://image.vans.co.kr/cmsstatic/product/VN0A5JIVCMA1_VN0A5JIVCMA1_primary.jpg?browse',
        '반스 신발 팝니다 사이즈 250', 1, 421);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '귀걸이', 1, '역삼 1동', 3000, 1,
        'https://i.pinimg.com/736x/11/96/2b/11962bb6654bcca8f47b28ee46d7f08e.jpg',
        '투명한 여름 감성 귀걸이 팝니다', 1, 35);
INSERT INTO `second_hand`.`item` (`created_at`, `category_id`, `content`, `location_id`, `location_name`, `price`,
                                  `status`, `thumbnail_url`, `title`, `user_id`, `view_count`)
VALUES (NOW(), 1, '체리', 1, '역삼 1동', 230000, 1,
        'https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjVfMjc1/MDAxNDkzMTIzMjMyNjEw.FxzWI1adhcle8nPnyFuDHwv3dEMfhxCA9h4PbJLIcWUg.OpoK9GiEcg6xH2OpmZtrJXrvURkpUa8IPRL5Vn2V8yQg.JPEG.juka_6666/image_5627185291493123112382.jpg?type=w800',
        '카드캡터 체리 요술봉 판매합니다', 1, 4230);
