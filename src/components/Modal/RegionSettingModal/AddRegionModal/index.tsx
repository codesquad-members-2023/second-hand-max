import { Modal } from '@components/Modal/ModalSheet';
import { AddRegionModalHeader } from './AddRegionModalHeader';
import { SearchBar } from './SearchBar';
import { RegionList } from './RegionList';
import { Address } from 'types/region';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/QUERY_KEY';
import { getRegions } from 'apis/region';
import { useState } from 'react';
import { Loader } from '@components/Loader';

type Props = {
  onModalClose: () => void;
  addRegion: (address: Address) => void;
};

export const AddRegionModal: React.FC<Props> = ({
  onModalClose,
  addRegion,
}) => {
  const [searchWord, setSearchWord] = useState('');
  const regionQuery = useQuery(QUERY_KEY.REGION, () => getRegions(searchWord));

  const regions = regionQuery.data?.data.contents;

  const onSearchWordChange = (word: string) => setSearchWord(word);

  return (
    <Modal onModalClose={onModalClose}>
      <AddRegionModalHeader onModalClose={onModalClose} />
      <SearchBar onChange={onSearchWordChange} />

      {regionQuery.isLoading ? (
        <Loader />
      ) : (
        <RegionList {...{ regions, onClick: addRegion }} />
      )}
    </Modal>
  );
};
