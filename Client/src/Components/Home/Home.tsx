import React, { useState } from 'react'
import './Home.css'
import animationData from '../../assets/lotties/Animation - 1717768499295.json';
import Lottie from 'lottie-react';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/modal';
const Home = () => {
  const [modal,setModal] = useState<boolean>(false);
  
  const {currentUser} = useAppSelector(data => data.user);
  
  const navigate = useNavigate();
  
  const closeModal = () =>{
    setModal(false);
  } 

  return (
    <div className='inner-container'>
        <div className='inner-container-1'>
            <h1>Learn new concepts for  each questions</h1>
            <div><button onClick={currentUser ? ()=>setModal(true) : ()=>navigate('/auth')   }>start Quiz</button></div>
        </div>
        <div className='inner-container-2'>
        <Lottie animationData={animationData} loop={true} height={300} width={300}  />
        </div>
        {modal && <Modal isOpen={modal}  closeModal={closeModal}/>}
    </div>
  )
}

export default Home
