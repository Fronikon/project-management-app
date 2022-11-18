export interface BoardType {
  _id: string;
  title: string;
  description: string;
  owner: string;
  users: string[];
}

export type BoardFormType = Pick<BoardType, 'title' | 'description'>;

export type BoardTypeWithoutId = Omit<BoardType, '_id'>;
