import { useContext, useState } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../common/AuthContext";
import NavigationBar from "../navigationBar/NavigationBar";
import axios from "axios";


import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { authToken, setToken, setUserId, setIsAdmin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (email && password) {
      axios
        .post("http://localhost:8080/api/auth/signin", {
          username: email,
          password: password,
        })
        .then(function (response) {
          if (response.data.id) {
            setUserId(response.data.id);
          }
          if (response.data.token) {
            setToken(response.data.token);
          }
          if (response.data.roles && response.data.roles.includes("ADMIN")) {
            setIsAdmin(true);
          }
          navigate("/products");
        })
        .catch(function () {
          alert("Error: Invalid credentials.");
        });
    }
  };

  if (authToken) {
    navigate("/products");
  }

  return (
    <>
      <NavigationBar />
      <div className="loginBucket">
        <form autoComplete="off" onSubmit={onSubmit}>
          <Avatar className="avatarIcon">
            <LockIcon />
          </Avatar>
          <Typography gutterBottom variant="h5" component="p">
            Sign in
          </Typography>
          <TextField
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            type="email"
            sx={{ mb: 4 }}
            fullWidth
            value={email}
            error={emailError}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            type="password"
            value={password}
            error={passwordError}
            fullWidth
            sx={{ mb: 4 }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, width: "100%" }}
          >
            Sign In
          </Button>
          <div className="loginLink">
                      <Link to="/Signup">Don't have an account? Sign Up</Link>
                    </div>
        </form>
      </div>
      <div className="loginFooter">
        Copyright &copy; <Link href="https://www.upgrad.com/">upGrad</Link> 2023
      </div>
    </>
  );
}

export default Login;
