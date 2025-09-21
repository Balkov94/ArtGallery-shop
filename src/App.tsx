import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { AuthGuard } from './components/ui/AuthGuard';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { PaintingDetail } from './pages/PaintingDetail';
import { About } from './pages/About';
import { Auth } from './pages/Auth';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AuthGuard>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/painting/:id" element={<PaintingDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/auth" element={<Auth />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </AuthGuard>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;