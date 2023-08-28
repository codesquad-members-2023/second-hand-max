import type { Meta, StoryObj } from '@storybook/react';
import { ControlLocation } from './locationModal/content/ControlLocation';
import { ModalHeader } from './ModalHeader';
import { Modal } from './Modal';
import { SearchLocation } from './locationModal/content/SearchLocation';
import { ModalListItem } from './ModalListItem';

const meta: Meta = {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LocationModalControl: Story = {
  render: () => (
    <Modal isOpen={true} isDimOpen={true}>
      <ModalHeader title="동네 설정" onCloseModal={() => {}} />
      <ControlLocation onToggleContent={() => {}} />
    </Modal>
  ),
};
const locationList = [
  { id: 0, text: '역삼1동' },
  { id: 1, text: '역삼2동' },
  { id: 2, text: '역삼3동' },
  { id: 3, text: '역삼4동' },
  { id: 4, text: '역삼5동' },
  { id: 5, text: '역삼6동' },
  { id: 6, text: '역삼7동' },
  { id: 7, text: '역삼8동' },
  { id: 8, text: '역삼9동' },
  { id: 9, text: '역삼10동' },
];

export const LocationModalSearch: Story = {
  render: () => (
    <Modal isOpen={true} isDimOpen={true}>
      <ModalHeader onNavigateBack={() => {}} onCloseModal={() => {}} />
      <SearchLocation locationList={locationList} />
    </Modal>
  ),
};

const categoryList = [
  { id: 0, text: '여성잡화' },
  { id: 1, text: '남성패션/잡화' },
  { id: 2, text: '뷰티/미용' },
  { id: 3, text: '스포츠/레저' },
  { id: 4, text: '취미/게임/음반' },
  { id: 5, text: '중고차' },
  { id: 6, text: '티켓/교환권' },
  { id: 7, text: '가공식품' },
  { id: 8, text: '반려동물용품' },
  { id: 9, text: '식물' },
  { id: 10, text: '기타 중고물품' },
  { id: 11, text: '기타 중고물품' },
  { id: 12, text: '기타 중고물품' },
  { id: 13, text: '기타 중고물품' },
  { id: 14, text: '기타 중고물품' },
];

export const CategoryModaldefault: Story = {
  render: () => (
    <Modal isOpen={true} isDimOpen={true}>
      <ModalHeader title="카테고리" onCloseModal={() => {}} />
      <ul>
        {categoryList.map((item) => (
          <ModalListItem text={item.text} onClick={() => {}} />
        ))}
      </ul>
    </Modal>
  ),
};
