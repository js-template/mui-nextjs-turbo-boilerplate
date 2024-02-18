"use client";

// import { Button } from "@mui/material";
import { Button } from "ui";

const GoBackBtn = () => {
   return (
      <Button variant='outlined' color='secondary' onClick={() => window.history.back()}>
         Go Back
      </Button>
   );
};

export default GoBackBtn;
