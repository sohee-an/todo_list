export type TCategory = {
  cid: string;
  memo: string;
  title: string;
  item: TTodo[] | [];
};
export type TTodo = {
  id: string;
  memo: string;
  title: string;
  selected: boolean;
};

export type TUpdateTodo = {
    id: string;
    memo: string;
    title: string;
   
}