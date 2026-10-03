import { useState } from 'react';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import type { AuthData } from './types';

function App() {
  const [auth, setAuth] = useState<AuthData | null>(null);

  if (!auth) {
    return <Login onLogin={setAuth} />;
  }

  return <Chat auth={auth} onLogout={() => setAuth(null)} />;
}

export default App;
