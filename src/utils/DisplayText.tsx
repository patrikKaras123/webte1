import { Container, Typography, Stack } from '@mui/material'
import { FC} from 'react';

interface DisplayTextProps {
  game: boolean;
  text: string;
}

const DisplayText: FC<DisplayTextProps> = (props) => {
  const {game, text} = props
  return (
    <>
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
          {text}
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        ></Stack>
      </Container>
    </>
  )
}

export default DisplayText;