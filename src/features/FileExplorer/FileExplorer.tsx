import FolderItem from '../../components/FolderItem/FolderItem';
import FileItem from '../../components/FileItem/FileItem';
import styles from './FileExplorer.module.css';
import {useFileExplorer} from './useFileExplorer';
import Toolbar from '../../components/Toolbar/Toolbar';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import PreviewModal from '../../components/PreviewModal/PreviewModal';
import {useState} from 'react';
import {Loader} from 'lucide-react';

const FileExplorer = () => {
  const {
    folders,
    files,
    historyPath,
    openFolder,
    goBack,
    goHome,
    onNavigate,
    openFile,
    fileDetails,
    fileTextContent,
    loading,
    loadingFile,
    error,
    setError,
    downloadFile,
  } = useFileExplorer();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div>
      <Toolbar goBack={goBack} goHome={goHome} onLogout={handleLogout} />
      <Breadcrumbs historyPath={historyPath} onNavigate={onNavigate} />
      {error && (
        <div className={styles.errorBanner}>
          <span className={styles.errorText}>{error}</span>
          <button className={styles.errorClose} onClick={() => setError('')}>
            ✕
          </button>
        </div>
      )}
      {loading ? (
        <span className={styles.loader}>
          <Loader className={styles.loadIcon} /> Loading...
        </span>
      ) : (
        <div className={styles.itemsGrid}>
          {folders.map((folder) => (
            <FolderItem
              key={folder.id || folder.path_lower}
              name={folder.name}
              onClick={() => openFolder(folder.path_lower!)}
            />
          ))}

          {files.map((file) => (
            <FileItem
              key={file.id}
              name={file.name}
              path={file.path_lower!}
              onClick={() => {
                // Открываем файл и показываем модальное окно предпросмотра
                openFile(file.path_lower!, file.name);
                setModalOpen(true);
              }}
              onDownload={downloadFile}
            />
          ))}

          {/* Модальное окно показывается только после открытия файла */}
          {isModalOpen && (
            <PreviewModal
              onClick={() => setModalOpen(false)}
              fileDetails={fileDetails}
              fileTextContent={fileTextContent}
              loadingFile={loadingFile}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
