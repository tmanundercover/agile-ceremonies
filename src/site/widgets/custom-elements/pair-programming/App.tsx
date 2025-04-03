import React, {FC, useState} from 'react';
import styles from './element.module.css';
import StandupModal from './StandupModal';
import StandupBoardRoom from './StandupBoardRoom';
import OfficeView from './OfficeView';

interface Props {
  displayName?: string;
}

const App: FC<Props> = ({ displayName = `Your Widget's Title` }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [standupData, setStandupData] = useState([]);

  const handleModalClose = (data:any) => {
    setStandupData(data);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.root}>
        {isModalOpen ? (
        <StandupModal onClose={handleModalClose} />
      ) : (
        <StandupBoardRoom standupData={standupData} />
      )}
      <OfficeView />
    </div>
  );
};

export default App;
