import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<>Home</>} />
      <Route path="/posts" element={<>posts</>} />
      <Route path="/posts/:id" element={<>posts detail</>} />
      <Route path="/posts/new" element={<>posts/new</>} />
      <Route path="/posts/edit" element={<>posts/edit</>} />
      <Route path="/profile" element={<>profile</>} />
      <Route path="/profile/edit" element={<>profile/edit</>} />
      <Route path="/notification" element={<>notification</>} />
      <Route path="/search" element={<>search</>} />
      <Route path="/users/login" element={<>login</>} />
      <Route path="/users/signup" element={<>signup</>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
export default App;
