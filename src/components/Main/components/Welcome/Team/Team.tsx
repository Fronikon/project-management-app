import React, { FC } from 'react';
import { TeamListInterface } from '../../../../../types/interfaces';
import styles from './Team.module.css';
import Andrey from '../../../../../assets/Andrey.png';
import Dmitriy from '../../../../../assets/Dmitriy.png';
import Daniil from '../../../../../assets/Daniil.png';

const Team: FC = () => {
  const teamList: TeamListInterface[] = [
    {
      img: Andrey,
      color: '#EABFFF',
      engName: 'Andrey Lavrenov',
      engPosition: 'Developer',
      rusName: 'Андрей Лаврёнов',
      rusPosition: 'Разработчик',
      key: 1,
    },
    {
      img: Dmitriy,
      color: '#B1D0FF',
      engName: 'Dmitry Beresnev',
      engPosition: 'Team-lead',
      rusName: 'Дмитрий Береснев',
      rusPosition: 'Лидер команды',
      key: 2,
    },
    {
      img: Daniil,
      color: '#93E396',
      engName: 'Daniil Sharenkov',
      engPosition: 'Developer',
      rusName: 'Даниил Шаренков',
      rusPosition: 'Разработчик',
      key: 3,
    },
  ];

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
