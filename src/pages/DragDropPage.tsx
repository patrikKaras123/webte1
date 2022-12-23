import { AppBar, Box, createTheme, CssBaseline, Grid, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import DragDrop from '../components/DragDrop';
import Splashscreen from '../components/Splashscreen';
import useSetter from '../hooks/useSetter';
import { Copyright } from '../utils/Copyright';
import FlagIcon from '@mui/icons-material/Flag'
const theme = createTheme()

const DragDropPage = () => {
  const [play, setPlay] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<number>(1);
  const { setLevel } = useSetter();

  const difficultHandler = (data: number) => {
    setLevel(data);
    setPlay(false);
    setDifficulty(data);
  }

  const playHandler = () => {
    setPlay(!play);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <FlagIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Flag Game
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid style={outerStyling}>
        {
          play ? (
            <Splashscreen setDifficulty={difficultHandler} />
          )
            : (
              <DragDrop difficulty={difficulty} setPlay={playHandler} />
            )}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Peter & Patrik
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Webtech Project
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </Grid>
    </ThemeProvider>
  );
}

export default DragDropPage;

const outerStyling = {
  backgroundImage: `url("https://images.hdqwalls.com/download/space-colorful-abstract-4k-3s-3840x2160.jpg")`,
  height: "100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
}