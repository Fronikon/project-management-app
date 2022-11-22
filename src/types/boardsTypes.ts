export interface BoardType {
  _id: string;
  title: string;
  description: string;
  color: string;
  owner: string;
  users: string[];
}

export type BoardFormType = Pick<BoardType, 'title' | 'description' | 'color'>;

export type BoardTypeWithoutId = Omit<BoardType, '_id'>;
