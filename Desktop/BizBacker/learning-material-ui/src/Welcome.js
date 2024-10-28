import * as React from "react";
import {
  Box,
  CssBaseline,
  Stack,
  Typography,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AppTheme from "./shared-theme/AppTheme";
import Logo from "./assets/BizBackerLogo (1).png"; // Import your logo SVG

const BackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `linear-gradient(240deg, #2e3e52 70%, #E0F7FA 30%)`,
  color: "#fff",
  minHeight: "100vh",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    right: "0",
    top: "54%",
    width: "",
    height: "",
    borderStyle: "solid",
    borderWidth: "0 0 400px 400px", // Triangle dimensions
    borderColor: "transparent transparent #E0F7FA transparent", // Triangle color
    opacity: 0.9
  },
}));
const ContentContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const CTAButton = styled(Button)(({ theme }) => ({
  width: "200px", // Slightly reduced width
  height: "50px", // Slightly reduced height
  fontSize: "1rem", // Slightly smaller font size
  fontWeight: 600,
  color: "#364961",
  backgroundColor: "#9fd3c7;",
  borderRadius: theme.spacing(2),
  textTransform: "none",
  transition: "transform 0.2s ease, box-shadow 0.2s ease", // Add smooth transitions
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center", // Center text within sections
}));

export default function MainSignIn() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <BackgroundContainer>
        <ContentContainer maxWidth="lg">
          {" "}
          {/* Use Container for better layout control */}
          <Stack spacing={4} alignItems="center">
            {" "}
            {/* Center content vertically */}
            <img src={Logo} alt="BizBacker Logo" width="150" /> {/* Logo */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 700,
                color: "#E0F7FA",
              }}
            >
              Welcome to BizBacker
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "1.2rem", maxWidth: "600px", mx: "auto" }}
            >
              Fuel your growth as an investor or small business owner with a
              trusted platform for secure, flexible funding opportunities.
            </Typography>
            <Stack direction="row" spacing={4} justifyContent="center">
              <CTAButton href="/investor-signin">
                Sign in as an Investor
              </CTAButton>
              <CTAButton href="/business-signin">
                Sign in as a Business
              </CTAButton>
            </Stack>
          </Stack>
          {/* Feature Sections */}
          <Grid container spacing={4} sx={{ mt: 8 }}>
            {" "}
            {/* Add margin top */}
            <Grid item xs={12} md={4}>
              <Section>
                {/* ... Section content ... */}
                <Typography variant="h5" sx={{ color: "#f95959" }}>
                  Secure Transactions
                </Typography>
                <Typography variant="body1" sx={{ color:   "#9fd3c7" }}>
                  Bank-level security to protect your investments.
                </Typography>
              </Section>
            </Grid>
            <Grid item xs={12} md={4}>
              <Section>
                {/* ... Section content ... */}
                <Typography variant="h5" sx={{ color:  "#f95959" }}>
                  Flexible Funding
                </Typography>
                <Typography variant="body1" sx={{ color:  "#9fd3c7" }}>
                  Tailored funding options to meet your business needs.
                </Typography>
              </Section>
            </Grid>
            <Grid item xs={12} md={4}>
              <Section>
                {/* ... Section content ... */}
                <Typography variant="h5" sx={{ color:  "#f95959" }}>
                  Transparent Process
                </Typography>
                <Typography variant="body1" sx={{ color:  "#9fd3c7" }}>
                  Clear and straightforward investment process.
                </Typography>
              </Section>
            </Grid>
          </Grid>
          {/* Footer */}
          <Box sx={{ mt: 8, textAlign: "center", color: "#E0F7FA" }}>
            {" "}
            {/* Add margin top and styling */}
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} BizBacker. All rights reserved.
            </Typography>
          </Box>
        </ContentContainer>
      </BackgroundContainer>
    </AppTheme>
  );
}
