import {useState} from 'react';
import {dropboxAuth} from '../../services/dropbox/dropboxAuth';
import {dropboxService} from '../../services/dropbox/dropboxService';
import styles from './TokenAuth.module.css';

interface TokenAuthProps {
  onTokenSaved: () => void;
}

export const TokenAuth = ({onTokenSaved}: TokenAuthProps) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSave = async () => {
    if (!token.trim()) {
      setError('Token cannot be empty');
      return;
    }

    setIsValidating(true);
    setError('');

    try {
      const isValid = await dropboxService.validateToken(token);

      if (!isValid) {
        setError('Invalid access token. Please check and try again.');
        setIsValidating(false);
        return;
      }

      dropboxAuth.saveToken(token);
      dropboxService.resetClient();
      onTokenSaved();
    } catch (error) {
      console.error('Error validating token:', error);
      setError('Failed to validate token. Please try again.');
      setIsValidating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isValidating) {
      handleSave();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            className={styles.icon}>
            <path
              d="M12 0L0 8L12 16L24 8L12 0ZM36 0L24 8L36 16L48 8L36 0ZM0 24L12 32L24 24L12 16L0 24ZM24 24L36 32L48 24L36 16L24 24ZM12 40L24 32L12 24L0 32L12 40ZM36 40L48 32L36 24L24 32L36 40Z"
              fill="#0061FF"
            />
          </svg>
          <h1 className={styles.title}>Dropbox File Explorer</h1>
          <p className={styles.subtitle}>
            Connect your Dropbox account to browse and preview files
          </p>
        </div>

        <div className={styles.form}>
          <label htmlFor="token" className={styles.label}>
            Access Token
          </label>

          <input
            id="token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your Dropbox access token"
            className={styles.input}
            disabled={isValidating}
            autoFocus
          />

          {error && <p className={styles.error}>{error}</p>}

          <button
            className={styles.button}
            onClick={handleSave}
            disabled={isValidating}>
            {isValidating ? 'Validating...' : 'Connect to Dropbox'}
          </button>

          <div className={styles.help}>
            <p>Don't have a token?</p>
            <a
              href="https://www.dropbox.com/developers/apps"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}>
              Get one from Dropbox App Console →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
