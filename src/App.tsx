import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PremiumPage } from './pages/PremiumPage';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PremiumPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;