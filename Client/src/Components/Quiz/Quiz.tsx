import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { start, success } from "../../slice/quizSlice";
const Quiz = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lock, setLock] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  
  const [result, setResult] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  let option1 = useRef<HTMLLIElement>(null);
  let option2 = useRef<HTMLLIElement>(null);
  let option3 = useRef<HTMLLIElement>(null);
  let option4 = useRef<HTMLLIElement>(null);

  let option_array = [option1, option2, option3, option4];

  const { level } = useParams();
  let navigate = useNavigate();
  const { token } = useAppSelector((data) => data.user);
  let dispath = useAppDispatch();

  const authToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${BASE_URL}/quiz/${level}`, authToken)
        .then((res) => {
          const { data } = res.data;
          dispath(success(data));
        })
        .catch((err: any) => {
          console.log(err.response.data.message);
        });
    }

    fetchData();
  }, []);

  const { quizes } = useAppSelector((data) => data.quiz);

  const itemsPerPage: number = 1;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentQuiz = quizes.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(quizes.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages && isClicked) {

      option_array.forEach(option => {
        option.current?.classList.remove("green","red");
      })

      setCurrentPage(currentPage + 1);
      setLock(false);
      setIsClicked(false);
    } else if (currentPage >= totalPages) {
      setResult(true);
      return 0;
    }
  };

  const res = currentQuiz.map((item) => {
    return item.answers.findIndex(ans => String(ans.right) === 'true')
   })

   let index = res[0];

  const handleAnswerClick = (
    e: React.MouseEvent<HTMLLIElement>,
    isCorrect: string
  ) => {
    let target = e.target as HTMLLIElement;

    setIsClicked(true);
    if (!lock) {
      if (isCorrect === 'true') {
        
        target.classList.add("green");
        setScore((prev) => prev + 1);
      } else {
        
        target.classList.add("red");
        if(index >= 0){
          option_array[index].current?.classList.add("green");
        }
        
      }
      setLock(true);
    }
   
  };

  useEffect(() => {
    if(result === true){
      addScore()
    }
  },[result]);

    async function addScore(){
      await axios.post(`${BASE_URL}/score/`,{score,level},authToken)
      .then(res => {
        console.log(res.data.message);
      }).catch((err)=>{
        console.log('err:',err.response.data.message);
      })
    }

    
  return (
    <div className="container">
      <h1>Quiz Time</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          {currentQuiz.map((item, index) => (
            <div key={index}>
              <h2>{item.question}</h2>
              <ul>
                {item.answers.map((answer, answerIndex) => (
                  <li 
                    key={answerIndex}
                    ref={option_array[answerIndex]}
                    onClick={(e) => handleAnswerClick(e, String(answer.right))}
                  >
                    {answer.answerText}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button onClick={handleNextPage}>Next</button>
          <div className="index">
            {currentPage} of {totalPages}
          </div>
        </>
      )}
      {!result ? (
        <></>
      ) : (
        <>
          {" "}
          <h2>
            You Scored {score} out of {totalPages}
          </h2>
          <button onClick={() => navigate('/home')}>Go Home</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
