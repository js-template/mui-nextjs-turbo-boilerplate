"use client";

import { Button } from "@mui/material";

const GoBackBtn = () => {
   return (
      <Button variant='outlined' color='secondary' onClick={() => window.history.back()}>
         Go Back
      </Button>
   );
};

export default GoBackBtn;
