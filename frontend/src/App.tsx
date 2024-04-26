import { Route, Routes, useNavigate } from 'react-router-dom';
import Albums from './containers/Albums';
import Artists from './containers/Artists';
import Tracks from './containers/Tracks';
import Home from './containers/Home';
import AppBarSpotify from './containers/AppBar';
import { useState } from 'react';

function App() {
   return (
       <>
           <header>
              <AppBarSpotify />
           </header>
           <main>
               <Routes>
               <Route path={'/'} element={(<Home/>)}></Route>
               <Route path={'/albums'} element={(<Albums/>)} />
               <Route path={'/artists'} element={(<Artists />)} />
               <Route path={'/tracks'} element={(<Tracks/>)} />
               <Route path="*" element={<h1>Not found</h1>}/>
               </Routes>
           </main>



       </>
   );


}

export default App
