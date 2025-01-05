import React from 'react';
import {createRoot} from 'react-dom/client';
import {ThemeProvider} from '@mui/material/styles';
import theme from './styles/theme';
import Layout from './features/Layout';
import './css/styles/index.css';



const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
);


// reportWebVitals();




