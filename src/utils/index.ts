export type renderItemType<T> = {
  item: T;
  index: number;
};

export const validateEmail = (text: string) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (!reg.test(text)) return false;
  return true;
};
