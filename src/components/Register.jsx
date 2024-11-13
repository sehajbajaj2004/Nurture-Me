import axios from 'axios';
import React, { useState } from 'react'

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e){
        e.preventDefault()
        try{
            await axios.post("https://localhost:8080/Register",{
                username, email, phone, password
            })
        }
        catch(e){
            console.log(e);
        }
    }
    
  return (
    <>
    <section>
        <div className="section-registration">
            <div className="reg-image">
                <img src="" alt="" />
            </div>
            <div className="reg-form">
                <form action="POST" onSubmit={submit}>
                    <div>
                        <label htmlFor="username">Username </label>
                        <input type="text" name='username' placeholder='Username' id='username' required autoComplete='off'
                        
                        onChange={(e) => {setUsername(e.target.value) }}
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email </label>
                        <input type="email" name='email' placeholder='Enter Email id' id='email' required autoComplete='off'
            
                        onChange={(e) => {setEmail(e.target.value) }}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone">Phone Number (+91): </label>
                        <input type="number" name='phone' placeholder='Phone Number' id='phone' required autoComplete='off'
            
                        onChange={(e) => {setPhone(e.target.value) }}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Create Password </label>
                        <input type="password" name='password' placeholder='Enter Password' id='password' required autoComplete='off'
                        
                        onChange={(e) => {setPassword(e.target.value) }}
                        />
                    </div>

                    <br />
                    <button type='submit'
                    onClick={submit}
                    >Register Now</button>
                </form>
            </div>
        </div>
    </section>
    </>
  )
}

export default Register