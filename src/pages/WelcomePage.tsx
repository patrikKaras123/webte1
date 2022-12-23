import { Grid } from '@mui/material';
import WelcomeScreen from '../components/WelcomeScreen';

const WelcomePage = () => {
  return (
    <Grid style={outerStyling}>
      <WelcomeScreen />
    </Grid>
  )
}

export default WelcomePage;


const outerStyling = {
  backgroundImage: `url("https://images.hdqwalls.com/download/space-colorful-abstract-4k-3s-3840x2160.jpg")`,
  height: "100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
}