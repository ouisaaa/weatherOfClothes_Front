import './App.css';
import Article from './component/Article';
import Result from './component/Result';
import TopNavigator from './component/TopNavigator';
import {BrowserRouter,Route,Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <body>
          <TopNavigator/>
       <BrowserRouter> 
        <Routes>  
          <Route path='/' element={<Article/>}></Route>
          <Route path='/result/:city/:dis/:nei' element={<Result/>}></Route>
        </Routes>
      </BrowserRouter>
      </body>
    </div>
  );
}

export default App;
