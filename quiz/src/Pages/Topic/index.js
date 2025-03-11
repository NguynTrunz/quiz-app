import { useEffect, useState } from "react";
import { getListTopics } from "../../services/topicService";
import { NavLink } from "react-router-dom"
import "./style.scss"
function Topic() {
  const [topics, setTopics] = useState([])
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTopics();
      setTopics(response)
    }
    fetchApi();
  }, [])

  return (
    <>
      <div>
        <h2>Danh sách các chủ đề</h2>
        {topics.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Tên chủ đề</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {topics.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td><NavLink to={"/quiz/" + item.id} className="topics__button">làm bài</NavLink></td>
              </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
export default Topic;