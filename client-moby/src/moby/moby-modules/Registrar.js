import React, { useState } from 'react';

const Registrar = () => {
  const [uname, setUname] = useState('');
  const [pw, setPw] = useState('');
  const [type, setType] = useState('');
  const [checkUname, setCheckUname] = useState(null);

  const handleCheckUsername = async (value) => {

    setUname(value);

    if (value.trim() !== ''){
      try {
        const response = await fetch(`/hyperion/check/${value}`);
        const data = await response.json();
        setCheckUname(data.exists);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleRegister = async () => {

    console.log({ uname, pw, type });

    try {
      const response = await fetch('/hyperion/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uname, pw, type }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {checkUname !== null && (<>{checkUname ? '❌' : '✔️'}</>)}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <label>
          Username:
          <input type="text" value={uname} onChange={(e) => handleCheckUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
        </label>
        <br />
        <label>
          Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registrar;
