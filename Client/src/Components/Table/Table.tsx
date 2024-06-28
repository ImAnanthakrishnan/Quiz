import React from 'react';
import './Table.css'; 
import { useAppSelector } from '../../app/hooks';
import profile from "../../assets/images/profile.png";
const Table = () => {

    const {users : data} = useAppSelector(data=>data.leaderboard)

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Score</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={profile} alt={item.name} className="table-image" />
              </td>
              <td>{item.name}</td>
              <td>{item.score}</td>
              <td>{item.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
