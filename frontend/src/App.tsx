import { Route, Routes } from 'react-router-dom';
import Albums from './containers/Albums';
import Artists from './containers/Artists';
import Tracks from './containers/Tracks';
import Home from './containers/Home';
import AppBarSpotify from './containers/AppBar';
import Add from './components/Add';
import Register from './components/usets/Register';

function App() {
   return (
       <>
           <header>
              <AppBarSpotify />
           </header>
           <main className="container-fluid">
               <Routes>
               <Route path={'/'} element={(<Home/>)}></Route>
               <Route path={'/albums'} element={(<Albums/>)} />
               <Route path={'/artists'} element={(<Artists />)} />
               <Route path={'/tracks'} element={(<Tracks/>)} />
               <Route path={'/register'} element={(<Register />)} />
               <Route path="*" element={<h1>Not found</h1>}/>
               <Route path='add' element={(<Add/>)} />
               </Routes>
           </main>



       </>
   );


}

export default App
