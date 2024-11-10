import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "state";  // Corrected path
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Typography, Box, InputAdornment } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("client");
  const [picturePath, setPicturePath] = useState(null);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create a FormData object to send data, including the image (if any)
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("role", role);
      if (picturePath) {
        formData.append("picture", picturePath);
      }

      // Make POST request to backend running on localhost:3000
      const response = await axios.post("http://localhost:3001/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { user, token } = response.data;

      // Dispatch login action to store user and token in Redux
      dispatch(setLogin({ user, token }));

      // Redirect to the home page
      navigate("/home");
    } catch (err) {
      setError("Registration failed. Try again.");
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
        Register to PetPal
      </Typography>
      <form onSubmit={handleRegister} encType="multipart/form-data">
        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">+1</InputAdornment>,
          }}
        />
        <TextField
          label="Location"
          fullWidth
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          label="Role"
          fullWidth
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ margin: "1rem 0" }}
        >
          Upload Profile Picture
          <input
            type="file"
            hidden
            onChange={(e) => setPicturePath(e.target.files[0])}
          />
        </Button>

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
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterPage;
