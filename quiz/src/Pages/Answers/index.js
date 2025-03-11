import { getAnswersByUserID } from "../../services/answersService";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"
import { getListTopics } from "../../services/topicService";
function Answers() {
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const answersByUserID = await getAnswersByUserID();
      const topics = await getListTopics();
      setAnswers(answersByUserID)

      let result = [];

      for (let i = 0; i < answersByUserID.length; i++) {
        result.push(
          {
            ...topics.find(item => item.id === answersByUserID[i].topicId),
            ...answersByUserID[i],
          })
      }
      setAnswers(result.reverse());
    }
    fetchApi();
  }, [])
  console.log(answers);
  return (
    <>
      <div>
        <h2>Danh sách các chủ đề đã luyện tập</h2>
        {answers.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tên chủ đề</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {answers.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td><NavLink to={"/result/" + item.id} className="topics__button">Xem chi tiết</NavLink></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
export default Answers;