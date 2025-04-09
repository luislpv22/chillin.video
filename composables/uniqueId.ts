let id = 0;

export const useUniqueId = () => {
  return () => {
    id++;
    return id;
  };
};