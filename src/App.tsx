import './app.css';

import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import Posts from './pages/posts';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Posts />} path="/posts" />
      </Routes>
    </Layout>
  );
}
