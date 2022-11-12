import Andrey from '../assets/Andrey.png';
import Dmitriy from '../assets/Dmitriy.png';
import Daniil from '../assets/Daniil.png';
import { TeamListInterface } from '../types/teamTypes';

export const teamList: TeamListInterface[] = [
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
