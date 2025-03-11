import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopics } from "../../services/topicService"
import { createAnswers, getListQuestion } from "../../services/quetstionsService";
import { getCookie } from "../../helpers/cookie";
function Quiz() {
  const params = useParams();
  const [dataTopics, setDataTopics] = useState([])
  const [dataQuestion, setDataQuestion] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopics(params.id);
      setDataTopics(response)
    }
    fetchApi();
  }, [])

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListQuestion(params.id);
      setDataQuestion(response)
    }
    fetchApi();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);

    let selectedAnswers = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;
        selectedAnswers.push({
          questionId: name,
          answer: value
        })
      }
    }
    let options = {
      userId: getCookie("id"),
      topicId: params.id,
      answers: selectedAnswers
    }
    const response = await createAnswers(options);
    console.log(response)
    if(response){
      navigate(`/result/${response.id}`);
    }
  }

  return (
    <>
      <div className="quiz">
        <form onSubmit={handleSubmit}>
          <h2 className="quiz__topic">Chủ đề câu hỏi: {dataTopics && (<>{dataTopics.name}</>)}</h2>
          <div className="quiz__container">
            {dataQuestion.map((item, index) => (
              <div className="quiz__item" key={item.id}>
                <h4 className="question__item-title">Câu {index + 1}:{item.question}</h4>
                <div className="quiz__answers">
                  {item.answers.map((itemAns, indexAns) => (
                    <div className="quiz__answer" key={indexAns} >
                      <input className="quiz__answer-input" type="radio"
                        name={item.id} value={indexAns} id={`quiz-${item.id}-${indexAns}`} />
                      <label htmlFor={`quiz-${item.id}-${indexAns}`}>{itemAns}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button type="submit">
            Nộp bài
          </button>
        </form>
      </div>
    </>
  )
}
export default Quiz;