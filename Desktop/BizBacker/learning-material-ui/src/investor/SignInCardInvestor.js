import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ForgotPassword from "../ForgotPassword";
import { GoogleIcon, FacebookIcon, BizBackerLogo } from "../CustomIcons";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  minHeight: "700px",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  borderRadius: "12px",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 4px 12px, rgba(0, 0, 0, 0.05) 0px 8px 24px",
  backgroundImage: "linear-gradient(135deg, #364961, #364961)",
  [theme.breakpoints.up("sm")]: {
    width: "550px",
  },
  color: "#E0E6ED",
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  "& .MuiFormLabel-root": {
    color: "#E0E6ED",
  },
  "& .MuiTextField-root": {
    backgroundColor: "#2F4A5E",
    color: "#E0E6ED",
    "& input": {
      color: "#E0E6ED",
    },
  },
  "& .MuiButton-outlined": {
    backgroundColor: "#DFF7F9",
    color: "#0A1717",
  },
  "& .MuiDivider-root": {
    backgroundColor: "#445A75",
  },
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Sign-in successful!");
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Error signing in: " + error.message);
    }
  };

  const validateInputs = () => {
    let isValid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in result:", result);
      alert("Google sign-in successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Error signing in with Google: " + error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Facebook sign-in result:", result);
      alert("Facebook sign-in successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
      alert("Error signing in with Facebook: " + error.message);
    }
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <BizBackerLogo />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "clamp(2rem, 10vw, 2.15rem)",
          color: "#E0E6ED",
        }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSignIn}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email" sx={{ color: "#E0E6ED" }}>
            Email
          </FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
            sx={{ ariaLabel: "email", "& input": { color: "black !important" } }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password" sx={{ color: "#E0E6ED" }}>
              Password
            </FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "baseline", color: "#AAC4E1" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="Enter your password"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& input": { color: "black !important" },
            }}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          sx={{ color: "#E0E6ED" }}
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type="submit"
          style={{
            backgroundColor: "#DFF7F9",
            color: "#364761",
          }}
          fullWidth
          variant="outlined"
        >
          Sign in
        </Button>
        <Typography sx={{ textAlign: "center", color: "#E0E6ED" }}>
          Don&apos;t have an account?{" "}
          <Link
            href="./signup-i"
            variant="body2"
            sx={{ alignSelf: "center", color: "#AAC4E1" }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: "#445A75" }}>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleSignIn}
          startIcon={<GoogleIcon />}
          sx={{ backgroundColor: "#DFF7F9", color: "#364861 !important" }}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleFacebookSignIn}
          startIcon={<FacebookIcon />}
          sx={{ backgroundColor: "#DFF7F9", color: "#364861 !important" }}
        >
          Sign in with Facebook
        </Button>
      </Box>
    </Card>
  );
}
