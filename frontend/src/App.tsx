import { Alert } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { selectUser } from './store/users/usersSlice';
import AppToolbar from './components/AppToolBar/AppBar';
import Artists from './features/Artists';
import Albums from './features/Albums';
import Tracks from './features/Tracks';
import TracksHistory from './store/track/TracsHistory';
import Login from './features/Users/Login';
import Register from './features/Users/Register';

function App() {
    const user = useAppSelector(selectUser);

    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <Routes>
                <Route path="/" element={user && <Artists />} />
                <Route path="/albums/:id" element={user && <Albums />} />
                <Route path="/tracks/:id" element={user && <Tracks />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/track_history" element={<TracksHistory />} />
                <Route path="*" element={<Alert severity="error">Not found!</Alert>} />
            </Routes>
        </>
    )
}

export default App;