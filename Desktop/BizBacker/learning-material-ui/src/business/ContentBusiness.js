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
        mt:4,
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
            fontFamily:"Sans-Serif"
          }}
        >
          Get up to R 100 k in {" "}
          <Typography variant="h2" sx={{ fontWeight: "bold", color:'#364861' }}>
            simple &amp; easy
          </Typography>{" "}
          business funding
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
          Flexible funding solutions  designed for South Africa’s small businesses — {" "}
          <Typography variant="h6" sx={{ fontWeight: "bold", color:'#364861' }}>
            no collateral, no monthly repayments.
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}