import {
  ChevronLeft,
  Search,
  ListStart,
  Upload,
  Trash,
  FolderPlus,
  LogOut,
} from 'lucide-react';
import styles from './Toolbar.module.css';
import {dropboxAuth} from '../../services/dropbox/dropboxAuth';
import {dropboxService} from '../../services/dropbox/dropboxService';

interface ToolbarProps {
  goBack: () => void;
  goHome: () => void;
  onLogout?: () => void;
}

const Toolbar = ({goBack, goHome, onLogout}: ToolbarProps) => {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dropboxAuth.clearToken();
      dropboxService.resetClient();
      if (onLogout) {
        onLogout();
      }
    }
  };

  const handleNotImplemented = () => {
    alert('Not implemented');
  };

  return (
    <div className={styles.toolbarWrapper}>
      <div className={styles.iconContainerWrapper}>
        <div className={styles.iconContainer}>
          <button
            onClick={goHome}
            className={styles.iconButton}
            title="Home"
            aria-label="Go to home">
            <ListStart size={30} />
          </button>
          <button
            onClick={goBack}
            className={styles.iconButton}
            title="Back"
            aria-label="Go back">
            <ChevronLeft size={30} className={styles.backArrow} />
          </button>
        </div>
        <div className={styles.iconContainer}>
          <button
            onClick={handleNotImplemented}
            className={styles.iconButton}
            title="Search"
            aria-label="Search files">
            <Search size={30} />
          </button>
          <button
            onClick={handleNotImplemented}
            className={styles.iconButton}
            title="Upload"
            aria-label="Upload files">
            <Upload size={30} />
          </button>
          <button
            onClick={handleNotImplemented}
            className={styles.iconButton}
            title="New Folder"
            aria-label="Create new folder">
            <FolderPlus size={30} />
          </button>
          <button
            onClick={handleNotImplemented}
            className={styles.iconButton}
            title="Delete"
            aria-label="Delete selected">
            <Trash size={30} />
          </button>
        </div>
        <div className={styles.iconContainer}>
          <button
            onClick={handleLogout}
            className={`${styles.iconButton} ${styles.logoutButton}`}
            title="Log Out"
            aria-label="Log out">
            <LogOut size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
