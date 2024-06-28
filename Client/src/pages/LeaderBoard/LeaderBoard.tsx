import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Table from "../../Components/Table/Table";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { leaderFailed, leaderSuccess } from "../../slice/leaderboardSlice";

const LeaderBoard = () => {
    const [difficulty, setDifficulty] = useState<string>('easy');
  const { token } = useAppSelector((data) => data.user);

  const authToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const dispatch = useAppDispatch();



  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${BASE_URL}/score/?level=${difficulty}`, authToken)
        .then((res) => {
          dispatch(leaderSuccess(res.data.data));
        })
        .catch((err) => {
          console.log(err.response.data.message);
          dispatch(leaderFailed(err.response.data.message));
        });
    }
    fetchData();
  }, [difficulty]);


  return (
    <div>
      <Navbar />
      <label htmlFor="difficulty">Select Difficulty:</label>
      <select name="difficulty" id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <Table />
    </div>
  );
};

export default LeaderBoard;
