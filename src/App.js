import './App.css';
import Article from './component/Article';
import Result from './component/Result';
import TopNavigator from './component/TopNavigator';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <body >
        <QueryClientProvider client={queryClient}>
          <TopNavigator/>
       <BrowserRouter> 
        <Routes>  
          <Route path='/' element={<Article/>}></Route>
          <Route path='/result' element={<Result/>}></Route>
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
      </body>
      
    </div>
  );
}

export default App;
