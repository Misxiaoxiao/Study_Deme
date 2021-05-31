import { useAuth } from 'context/authContext'
import { AuthenticatedApp } from 'Authenticated-app'
import { UnauthenticatedApp } from 'unauthenticated-app'
import { FullPageErrorFallback } from 'components/lib'
import { ErrorBoundary } from 'components/errorBoundary'

import './App.css'

function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
