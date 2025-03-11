import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnswers } from "../../services/answersService";
import { getListQuestion } from "../../services/quetstionsService";
import "./style.scss";

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);


  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswers = await getAnswers(params.id);
      const dataQuestions = await getListQuestion(dataAnswers.topicId);

      console.log("dataAnswers:", dataAnswers);
      console.log("dataQuestions:", dataQuestions);

      let resultFinal = dataQuestions.map(question => {
        const answerData = dataAnswers.answers.find(answer => answer.questionId === question.id);
        return {
          ...question,
          userAnswer: answerData ? answerData.answer : null
        };
      });

      console.log("resultFinal:", resultFinal);

      setDataResult(resultFinal);

      // Tính số câu đúng và tổng số câu
      let correct = 0;
      let total = resultFinal.length;
      resultFinal.forEach(item => {
        if (item.userAnswer == item.correctAnswer) {
          correct++;
        }
      });
      setCorrectCount(correct);
      setTotalCount(total);
    };
    fetchApi();
  }, [params.id]);


  return (
    <>
      <div className="result">
        <h2>Các câu hỏi mà bạn đã luyện tập của chủ đề:</h2>
        <h2>Kết quả: {correctCount}/{totalCount} câu</h2>
        <div className="result__container">
          {dataResult.map((item, index) => (
            <div key={index}>
              <div className="result__item">
                <div className="result__item-title">
                  {item.userAnswer == item.correctAnswer ? (
                    <div className="result__item-title--correct">
                      <span>
                        Câu {index + 1}: {item.question} <u>(Đúng!!)</u>
                      </span>
                    </div>
                  ) : (
                    <div className="result__item-title--incorrect">
                      <span>
                        Câu {index + 1}: {item.question} <u>(Sai!)</u>
                      </span>
                    </div>
                  )}
                </div>

                {item.answers.map((itemAns, indexAns) => {
                  let classAns = "";
                  let choice = false;
                  let count = 0;

                  if (item.userAnswer == indexAns) {
                    choice = true;
                    classAns = "result__item-answer--selected";
                  }
                  if (item.correctAnswer == indexAns) {
                    classAns = "result__item-answer--correct";
                  }
                  return (
                    <div className="result__answer" key={indexAns}>
                      <input type="radio" checked={choice} disabled />
                      <label className={`result__item-answer ${classAns}`}>
                        {itemAns} {choice && "(Đã chọn)"}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Result;
