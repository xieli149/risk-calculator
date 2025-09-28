import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './pages/Home'

/**
 * App.tsx
 * Purpose: Application root with routing setup. Uses react-router (HashRouter) to display HomePage.
 */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>
  )
}
