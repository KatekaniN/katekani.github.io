import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import SignInCard from "./SignInCardBusiness";
import Content from "./ContentBusiness";
import AppTheme from "../shared-theme/AppTheme";

export default function SignInSide(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: "center",
            height: "100vh",
            minHeight: "100vh",
            bgcolor: "#e0f7fa", // Set a light background color for fallback
            position: "relative",
          },
          (theme) => ({
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              zIndex: -1,
              inset: 0,
              backgroundImage:
                "linear-gradient(135deg, #1e88e5 30%, #90caf9 70%)", // Gradient colors
            },
            "&::after": {
              content: '""',
              position: "absolute",
              zIndex: -1,
              top: "10%",
              right: "5%",
              width: "200px",
              height: "200px",
              backgroundColor: "#ffcc80",
              borderRadius: "50%",
              opacity: 0.3,
            },
            "&::secondShape": {
              content: '""',
              position: "absolute",
              zIndex: -1,
              bottom: "15%",
              left: "10%",
              width: "150px",
              height: "150px",
              backgroundColor: "#ffab91",
              borderRadius: "50%",
              opacity: 0.3,
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: "auto",
          }}
        >
          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
            }}
          >
            <Content />
            <SignInCard />
          </Stack>
        </Stack>
      </Stack>
    </AppTheme>
  );
}
