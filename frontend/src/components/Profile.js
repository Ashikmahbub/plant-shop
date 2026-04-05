import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <>
          <LoginForm />
          <p>Don't have an account? <button onClick={() => setIsLogin(false)}>Sign Up</button></p>
        </>
      ) : (
        <>
          <SignUpForm />
          <p>Already have an account? <button onClick={() => setIsLogin(true)}>Login</button></p>
        </>
      )}
    </div>
  );
};

export default AuthPage;
