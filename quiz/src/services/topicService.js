import { get } from "../utils/request";

export const getListTopics = async () => {
  const result = await get('topics');
  return result;
};

export const getTopics = async (id) => {
  const result = await get(`topics/${id}`);
  return result;
};