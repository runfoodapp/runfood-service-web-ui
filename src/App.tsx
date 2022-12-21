import { Card, CardContent, Container, createTheme, Grid, ThemeProvider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Logo from './components/Logo/Logo';
import Bar from './components/Progress/Bar';
import { CssBaseline } from '@mui/material/';
import OpenApp from './components/OpenApp/OpenApp';
import Error from './components/Error/Error';


const theme = createTheme({
  palette: {
    background: {
      default: "#0C431F"
    },
    primary: {
      main: "#0C431F"
    }
  },
  typography: {
    fontFamily: "Poppins"
  }
})

function App() {

  const [items, setItems] = useState<any>();
  const [errorText, setErrorText] = useState<string>();
  const [errorCode, setErrorCode] = useState<number>();
  const [progress, setProgress] = useState<number>(0)
    ;
  useEffect(() => {
    countDown();
    getApi();
  }, [])

  const getApi = async () => {
    fetch("https://dummyjson.com/praoducts")
      .then((res) => {
        if (res.ok) return res.json();
        else {
          setErrorText(res.statusText);
          setErrorCode(res.status)
        };
      })
      .then(data => setItems(data))
      .catch(err => console.log(err))
  }

  const countDown = () => {
    const timer = setInterval(() => {
      setProgress((oldProgress: number) => {
        const diff = Math.random() * 10;
        return Math.round(Math.min(oldProgress + diff, 100));
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        // direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh"}}
      >

        <Grid item xs={12} md={6}>
          <Card sx={{p: 5}}>
            <CardContent >
              <Logo />
              {(progress === 100 && !errorText) && <OpenApp />}
              {(progress < 100 && !errorText) && <Typography>Configurando RunFood...</Typography>}
              {errorText && <Error code={errorCode} text={errorText} />}
              <Bar progress={progress} color={errorText ? "error" : "primary"} />
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </ThemeProvider>

  );
}

export default App;
