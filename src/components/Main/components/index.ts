import { lazy } from 'react';

const Boards = lazy(() => import('./Boards/Boards'));
const PageNotFound = lazy(() => import('./PageNotFound/PageNotFound'));
const SignIn = lazy(() => import('./SignIn/SignIn'));
const SignUp = lazy(() => import('./SignUp/SignUp'));
const Welcome = lazy(() => import('./Welcome/Welcome'));
const Board = lazy(() => import('./Board/Board'));

export { Boards, Board, PageNotFound, SignIn, SignUp, Welcome };
