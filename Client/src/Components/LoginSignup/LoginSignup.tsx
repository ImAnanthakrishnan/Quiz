import React, {  useState } from "react";
import "./LoginSignup.css";
import user_icon from "../../assets/images/Assets/person.png";
import email_icon from "../../assets/images/Assets/email.png";
import password_icon from "../../assets/images/Assets/password.png";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useAppDispatch } from "../../app/hooks";
import { signInSuccess } from "../../slice/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type User = {
  name?: string;
  email: string;
  password: any;
}

const LoginSignup = () => {
  const [action, setAction] = useState<string>("Sign Up");
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  let dispath = useAppDispatch();
  let navigate = useNavigate();
  const handleSubmit = async() => {
    try {
      const url = action === "Login" ? "/auth/signin" : "/auth/signup";
      const data = 
        action === "Login"
          ? { email: formData.email, password: formData.password }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
            };

         const response = await axios.post(`${BASE_URL}${url}`,data);
         
         if(response.data){
          setFormData({name:"",email:"",password:""});
          const {data,message,token,success} = response.data;
          if(!success){
            toast.error(message);
           console.log(message)
          }else {
            if(message === `Welcome to our world`){
              setAction("Login");
            }
            toast.success(message);
           console.log(message)
          }
          
          dispath(signInSuccess({data,token}));
          if(data && token){
            navigate('/home');
          }
         }
    } catch (err:any) {
       toast.error(err.response.data.message);
       console.log(err.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
      <div className="submit1" onClick={handleSubmit}>
        Submit
      </div>
    </div>
  );
};

export default LoginSignup;
