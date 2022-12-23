import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { GAME } from '../constants';
import DisplayText from '../utils/DisplayText';


interface SplashscreenProps {
  setDifficulty: (data: number) => void;
}

const cards = ["../difficulties/easy.png", "../difficulties/medium.png", "../difficulties/hard.png"];
const headings = ["Easy Level", "Medium Level", "Hard Level"]

const Splashscreen: React.FC<SplashscreenProps> = (props: any) => {
  const { setDifficulty } = props;

  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 0,
          }}
        >
          <DisplayText game={false} text={GAME} />
        </Box>
        <Container sx={{ py: 3 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card: any, index: any) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 280
                    }}
                    image={card}
                    alt={headings[index]}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {headings[index]}
                    </Typography>
                    <Typography>
                      <Button style={{ fontWeight: "bold" }} onClick={() => setDifficulty(index + 1)} variant="contained">Pick!</Button>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}

export default Splashscreen;