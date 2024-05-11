import { Alert } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/AppToolBar/AppBar';
import Artists from './features/Artists';
import Albums from './features/Albums';
import Tracks from './features/Tracks';
import TracksHistory from './store/track/TracsHistory';
import Login from './features/Users/Login';
import Register from './features/Users/Register';
import FormAlbum from './features/FormAlbum';
import FormArtist from './features/FormArtist';
import FormTrack from './features/FormTrack';

function App() {

    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <Routes>
                <Route path="/" element={<Artists />} />
                <Route path="/albums/:id" element={<Albums />} />
                <Route path="/tracks/:id" element={<Tracks />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/addAlbum" element={<FormAlbum />} />
                <Route path="/addArtist" element={<FormArtist />} />
                <Route path="/addTrack" element={<FormTrack />} />
                <Route path="/track_history" element={<TracksHistory />} />
                <Route path="*" element={<Alert severity="error">Not found!</Alert>} />
            </Routes>
        </>
    );
}

export default App;