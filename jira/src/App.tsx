import { useAuth } from 'context/authContext'
import { AuthenticatedApp } from 'Authenticated-app'
import { UnauthenticatedApp } from 'unauthenticated-app'

import './App.css'

function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
