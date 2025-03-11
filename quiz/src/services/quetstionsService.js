import { get, post } from "../utils/request";

export const getListQuestion = async (topicId) => {
  const result = await get(`questions?topicId=${topicId}`);
  return result;
};

export const createAnswers = async (options) => {
  const result = await post('answers', options);
  return result;
};