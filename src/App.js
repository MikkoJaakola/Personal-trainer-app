import React from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';





import './App.css';

function App() {


  
  
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" >
            Customers
          </Typography>
          
        </Toolbar>
      </AppBar>

        <Customerlist />

        <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" >
            Trainings
          </Typography>
          
        </Toolbar>
      </AppBar>
      
        <Traininglist />
      
      
        
    </div>
  );
}

export default App;
