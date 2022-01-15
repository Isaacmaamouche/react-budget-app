import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';

import { BudgetProvider } from "../src/Contexts/BudgetContext";
import { ThemeProvider } from "../src/Contexts/ThemeContext"


const PORT = 8000;
const app = express();

app.use('^/$', (req, res, next) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) =>{
        if(err){
            console.error(err);
            return res.status(500).send("Oups, une erreur serveur s'est produite ...")
        }
        
        return res.send(data.replace('<div id="root"></div>', `<div id='root'>${ReactDOMServer.renderToString(
            <ThemeProvider>
            <BudgetProvider>
              <App />
            </BudgetProvider>
          </ThemeProvider>
          )}</div>`));
    });
});

app.use(express.static(path.resolve(__dirname,'..', 'build')))

app.listen(PORT, () => {
    console.log(`app launched on ${PORT}`);
})