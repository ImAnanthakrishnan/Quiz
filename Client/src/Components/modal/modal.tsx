import React, { useState } from "react";
import './modal.css';
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";

type PropsType={
    isOpen:boolean;
    
    closeModal:()=>void
}
const Modal = ({isOpen,closeModal}:PropsType) => {
  
    const [level,setLevel] = useState<string>('');
    let navigate = useNavigate();
    if(["easy","medium","hard"].includes(level)){
        navigate(`/quiz/${level}`);
    }

  return (
    <div>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}>
              ×
            </button>
            <h2 className="modal-title">Select the level</h2>
            <div className="modal-content">
              <button className="modal-btn" onClick={()=>setLevel('easy')}>Easy</button>
              <button className="modal-btn" onClick={()=>setLevel('easy')}>Medium</button>
              <button className="modal-btn" onClick={()=>setLevel('easy')}>Hard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
