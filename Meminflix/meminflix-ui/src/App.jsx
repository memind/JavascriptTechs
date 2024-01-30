import react from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import MoviePage from "./pages/Movies";
import Meminflix from "./pages/Meminflix";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
import TVShows from "./pages/TVShows";
import UserListedMovies from "./pages/UserListedMovies";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path="/player" element={<Player />} />
          <Route exact path="/tv" element={<TVShows />} />
          <Route exact path="/movies" element={<MoviePage />} />
          <Route exact path="/new" element={<Player />} />
          <Route exact path="/mylist" element={<UserListedMovies />} />
          <Route exact path='/' element={<Meminflix />} />
        </Routes>
      </BrowserRouter>
  );
}