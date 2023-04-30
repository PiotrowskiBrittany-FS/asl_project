import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QuizLayout = () => {
  const [quiz, setQuiz] = useState({ Questions: [] });
  const params = useParams();

  useEffect(() => {
    async function fetchQuiz() {
      const q = await axios(`http://localhost:3000/quizzes/${params.id}`, {
        headers: {
          token: localStorage.token,
        },
      });
      setQuiz(q.data);
    }
    fetchQuiz();
  }, []);

  return (
    <div>
      <form id="quiz">
        <h1>{quiz.name}</h1>
        <div>
          {quiz.Questions.map((q) => (
            <ul key={q.id}>
              <li>{q.question_text}</li>
              <div>
                <ul>
                  <li>
                    {q.Choices.map((c) => (
                      <div key={c.id}>
                        <label>
                          <input type="radio" name={"question_" + q.id} required />
                          {c.choice_text}
                        </label>
                      </div>
                    ))}
                  </li>
                </ul>
              </div>
            </ul>
          ))}
        </div>
        <button type="submit">
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizLayout;