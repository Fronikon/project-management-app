import React, { FC } from 'react';
import { useAppSelector } from '../../../../hooks/reduxHooks';

const Columns: FC = () => {
  const board = useAppSelector((store) => store.board.value);

  return <div>Board</div>;
};

export default Columns;
