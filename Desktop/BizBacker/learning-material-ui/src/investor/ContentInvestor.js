import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { BizBackerLogo } from "../CustomIcons";

export default function Content() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 550,
        mt: 4,
        ml: { xs: 2, md: 0 },
        alignItems: { xs: "flex-start", md: "flex-start" },
      }}
    >
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <BizBackerLogo />
      </Box>

      <Box sx={{ mt: { xs: 4, md: 0 } }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "",
            color: "#364861",
            textAlign: "left",
            mb: 1,
            fontFamily: "Sans-Serif",
          }}
        >
          Back Small Businesses with Investments{" "}
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", color: "#364861" }}
          >
            Starting from R100
          </Typography>{" "}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "black",
            textAlign: "left",
            mt: 2,
            color: "#364861",
          }}
        >
          Invest with Ease & Impact in South African Businesses—{" "}
          <Typography
            variant="h6"
            sx={{ color: "#364861", fontWeight: "bold" }}
          >
            in under 5 minutes.
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
