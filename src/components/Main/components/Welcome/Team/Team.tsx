import React, { FC } from 'react';
import { teamList } from '../../../../../data/teamData';
import { useAppSelector } from '../../../../../hooks/reduxHooks';
import styles from './Team.module.css';

const Team: FC = () => {
  const language = useAppSelector((store) => store.language.value);

  return (
    <>
      {teamList.map((person) => (
        <li className={styles.person} key={person.key} style={{ backgroundColor: person.color }}>
          <img src={person.img} alt={person.engName} />
          <h2 className={styles.name}>{language === 'eng' ? person.engName : person.rusName}</h2>
          <p className={styles.position}>
            {language === 'eng' ? person.engPosition : person.rusPosition}
          </p>
        </li>
      ))}
    </>
  );
};

export default Team;
