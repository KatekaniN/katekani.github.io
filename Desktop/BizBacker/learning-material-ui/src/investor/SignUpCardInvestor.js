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
import { GoogleIcon, FacebookIcon, BizBackerLogo } from "../CustomIcons";
import { auth } from "../firebase"; // Import your custom Firebase config

// Authentication methods
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  minHeight: "750px",
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

export default function SignUpCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed up:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        setEmailError(true);
        setEmailErrorMessage(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google sign-in successful:", result.user);
      })
      .catch((error) => {
        console.error("Error with Google sign-in:", error);
      });
  };

  const handleFacebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Facebook sign-in successful:", result.user);
      })
      .catch((error) => {
        console.error("Error with Facebook sign-in:", error);
      });
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (confirmPassword.value !== password.value) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }

    return isValid;
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
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
            required
            fullWidth
            variant="outlined"
            sx={{
              "& input": { color: "black !important" },
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password" sx={{ color: "#E0E6ED" }}>
            Password
          </FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="Enter your password"
            type="password"
            id="password"
            autoComplete="new-password"
            required
            fullWidth
            variant="outlined"
            sx={{
              "& input": { color: "black !important" },
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="confirmPassword" sx={{ color: "#E0E6ED" }}>
            Confirm Password
          </FormLabel>
          <TextField
            error={confirmPasswordError}
            helperText={confirmPasswordErrorMessage}
            name="confirmPassword"
            placeholder="Confirm your password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            required
            fullWidth
            variant="outlined"
            sx={{
              "& input": { color: "black !important" },
            }}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="terms" color="primary" />}
          label="I agree to the Terms and Conditions"
          sx={{ color: "#E0E6ED" }}
        />
        <Button
          type="submit"
          style={{
            backgroundColor: "#DFF7F9",
            color: "#364761",
          }}
          fullWidth
          variant="outlined"
          onClick={validateInputs}
        >
          Sign up
        </Button>
        <Typography sx={{ textAlign: "center", color: "#E0E6ED" }}>
          Already have an account?{" "}
          <Link
            href="./investor-signin"
            variant="body2"
            sx={{ alignSelf: "center", color: "#AAC4E1" }}
          >
            Sign in
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
          Sign up with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleFacebookSignIn}
          startIcon={<FacebookIcon />}
          sx={{ backgroundColor: "#DFF7F9", color: "#364861 !important" }}
        >
          Sign up with Facebook
        </Button>
      </Box>
    </Card>
  );
}
