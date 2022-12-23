import { Container, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { FLAG } from '../constants'

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const game = true;

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Flag Game
        </Typography>
        {game && <Typography
          component="h5"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          How to play.
        </Typography>}
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          {FLAG}
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        ></Stack>
      </Container>
    </div>
  );
});

//<ComponentToPrint ref={componentRef} />