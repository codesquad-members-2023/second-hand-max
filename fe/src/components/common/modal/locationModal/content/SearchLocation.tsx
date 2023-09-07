import { useState } from 'react';
import { css } from '@emotion/react';
import { Input } from '@/components/common/input/Input';
import { ModalListItem } from '../../ModalListItem';
import { ModalHeader } from '../../ModalHeader';
import { usePopupStore } from '@/store/popupStore';
import { useLocationWithQuery, usePatchMainLocation } from '@/hooks/location';

type Props = {
  // TODO : locationList의 타입 변경
  onToggleContent: (content: 'control' | 'search') => void;
};

export const SearchLocation: React.FC<Props> = ({ onToggleContent }) => {
  const [inputValue, setInputValue] = useState<string>(''); //훅으로 빼기 input은 디바운스 걸기
  const trimedInputValue = inputValue.trim();
  const { locations, refetch } = useLocationWithQuery(trimedInputValue);
  const [hasPressedEnter, setHasPressedEnter] = useState<boolean>(false); // 엔터를 눌렀는지 확인하는 상태
  const { togglePopup, setCurrentDim } = usePopupStore();

  const { patchMainLocationById } = usePatchMainLocation(() => {
    onToggleContent('control');
  });

  // TODO: 엔터를 입력하면 서버에서 검색된 동네 목록을 받아온다.
  // TODO: 동네는 시/도, 구/군, 동/읍/면 단위
  // TODO: 검색후 클릭시 대표 동네로 설정하면서 controlLocation으로 이동, input도 비워야한다

  const onChangeInput = (value: string) => {
    setInputValue(value);
    setHasPressedEnter(false);
  };

  const onSearchLocation = () => {
    refetch();
    setHasPressedEnter(true);
  };

  const onChangeMainLocation = (location: LocationType) => {
    setInputValue('');
    patchMainLocationById(location);
  };

  const onCloseModal = () => {
    togglePopup('modal', false);
    setCurrentDim(null);
    onToggleContent('control');
  };

  return (
    <>
      <ModalHeader
        onNavigateBack={() => onToggleContent('control')}
        onCloseModal={onCloseModal}
      />
      <div css={searchLocationStyle}>
        <div className="input__search">
          <Input
            onChange={onChangeInput}
            onPressEnter={onSearchLocation}
            placeholder="동명(읍, 면)으로 검색(ex. 서초동)"
            radius="s"
            variant="filled"
          />
        </div>

        {hasPressedEnter && locations && (
          <ul>
            {locations.map((location) => (
              <ModalListItem
                key={location.id}
                name={location.name}
                onClick={() => {
                  onChangeMainLocation(location);
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

const searchLocationStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;

  .input__search {
    padding: 0 16px;
  }

  ul {
    height: 570px;
  }
`;
