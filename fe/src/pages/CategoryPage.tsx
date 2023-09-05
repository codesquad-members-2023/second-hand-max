import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Header } from '@components/Header/Header';
import { TextButton } from '@components/Button/TextButton';
import { Icon } from '@components/Icon/Icon';

const list = [
  { id: 1, name: '인기매물', imageUrl: 'https://i.ibb.co/LSkHKbL/star.png' },
  {
    id: 2,
    name: '부동산',
    imageUrl: 'https://i.ibb.co/41ScRXr/real-estate.png',
  },
  { id: 3, name: '중고차', imageUrl: 'https://i.ibb.co/bLW8sd7/car.png' },
  {
    id: 4,
    name: '디지털기기',
    imageUrl: 'https://i.ibb.co/cxS7Fhc/digital.png',
  },
  {
    id: 5,
    name: '생활가전',
    imageUrl: 'https://i.ibb.co/F5z7vV9/domestic.png',
  },
  {
    id: 6,
    name: '가구/인테리어',
    imageUrl: 'https://i.ibb.co/cyYH5V8/furniture.png',
  },
  { id: 7, name: '유아동', imageUrl: 'https://i.ibb.co/VNKYZTK/baby.png' },
  {
    id: 8,
    name: '유아도서',
    imageUrl: 'https://i.ibb.co/LrwjRdf/baby-book.png',
  },
  {
    id: 9,
    name: '스포츠/레저',
    imageUrl: 'https://i.ibb.co/hXVgTyd/sports.png',
  },
  {
    id: 10,
    name: '여성잡화',
    imageUrl: 'https://i.ibb.co/yPwkyg3/woman-accessories.png',
  },
  {
    id: 11,
    name: '여성의류',
    imageUrl: 'https://i.ibb.co/4fvj6SC/woman-apparel.png',
  },
  {
    id: 12,
    name: '남성패션/잡화',
    imageUrl: 'https://i.ibb.co/wwfyjyB/man-apparel.png',
  },
  { id: 13, name: '게임/취미', imageUrl: 'https://i.ibb.co/cwJ74M4/game.png' },
  {
    id: 14,
    name: '뷰티/미용',
    imageUrl: 'https://i.ibb.co/cXrrK0m/beauty.png',
  },
  {
    id: 15,
    name: '반려동물용품',
    imageUrl: 'https://i.ibb.co/CbwHdNr/pet.png',
  },
  { id: 16, name: '도서/음반', imageUrl: 'https://i.ibb.co/7WjKkdt/book.png' },
  {
    id: 17,
    name: '티켓,교환권',
    imageUrl: 'https://i.ibb.co/kBhhs2p/ticket.png',
  },
  { id: 18, name: '생활', imageUrl: 'https://i.ibb.co/T0mnp8m/kitchen.png' },
];
export const CategoryPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <Header.Left>
          <TextButton
            size="M"
            textColor="neutralTextStrong"
            onClick={() => navigate(-1)}
          >
            <Icon name="chevronLeft" size="M" stroke="neutralTextStrong" />
            뒤로
          </TextButton>
        </Header.Left>
        <Header.Center>카테고리</Header.Center>
      </Header>
      <Content>
        {list.map((item) => (
          <Category key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <p>{item.name}</p>
          </Category>
        ))}
      </Content>
    </>
  );
};

const Content = styled.ul`
  display: flex;
  height: 796px;
  padding: 40px;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 32px;
  flex-wrap: wrap;
`;

const Category = styled.li`
  display: flex;
  width: 80px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  img {
    height: 44px;
  }
  p {
    align-self: stretch;
    width: 100%;
    text-align: center;
    font: ${({ theme: { font } }) => font.displayDefault12};
    color: ${({ theme: { color } }) => color.neutralText};
  }
`;
