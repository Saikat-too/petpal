import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "state";  // Corrected path to userSlice
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to backend running on localhost:3001
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      // Dispatch login action to store user and token in Redux state
      dispatch(setLogin({ user, token }));

      // Redirect to homepage
      navigate("/home");
    } catch (err) {
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Login to PetPal
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" sx={{ marginBottom: "1rem" }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{
            padding: "0.75rem",
            fontSize: "1rem",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
