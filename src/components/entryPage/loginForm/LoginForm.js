import React from 'react'
import './LoginForm.css'

export default function LoginForm() {
  return (
    <div>
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required />
      <br />

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required></input>

      <label>
        <input type="checkbox"
          checked="checked"
          name="remember" /> Remember me
      </label>

      <br />

      <div>
        <button type="submit">Login</button>

        <div class="container">
          <button type="button" class="cancelbtn">Cancel</button>
          <span class="psw">Forgot <a href="#">password?</a></span>
        </div>
      </div>
    </div>





  )


}
