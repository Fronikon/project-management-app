import React, { FC } from 'react';
import { teamList } from '../../../../../data/teamData';
import styles from './Team.module.css';

const Team: FC = () => {
  return (
    <>
      {teamList.map((person) => (
        <li className={styles.person} key={person.key} style={{ backgroundColor: person.color }}>
          <img src={person.img} alt={person.engName} />
          <h2 className={styles.name}>{person.engName}</h2>
          <p className={styles.position}>{person.engPosition}</p>
        </li>
      ))}
    </>
  );
};

export default Team;
