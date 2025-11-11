import {useState} from 'react';
import {TokenAuth} from './components/TokenAuth/TokenAuth';
import FileExplorer from './features/FileExplorer/FileExplorer';
import {dropboxAuth} from './services/dropbox/dropboxAuth';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    dropboxAuth.isAuthenticated(),
  );

  const handleAuthChange = () => {
    setIsAuthenticated(dropboxAuth.isAuthenticated());
  };

  return (
    <div className="app">
      {isAuthenticated ? (
        <div className="app-container">
          <FileExplorer />
        </div>
      ) : (
        <TokenAuth onTokenSaved={handleAuthChange} />
      )}
    </div>
  );
}

export default App;
