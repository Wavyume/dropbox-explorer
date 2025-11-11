import styles from './PreviewModal.module.css';
import {Loader} from 'lucide-react';

interface PreviewModalProps {
  fileDetails: Record<string, any>;
  onClick: () => void;
  fileTextContent?: string;
  loadingFile: boolean;
}

const PreviewModal = ({
  fileDetails,
  onClick,
  fileTextContent,
  loadingFile,
}: PreviewModalProps) => {
  // Определяем способ отображения файла на основе его типа
  // fileDetails.isText - текстовые файлы, читаемые напрямую
  // fileDetails.isPreview - документы, конвертированные Dropbox в PDF/HTML
  // Иначе - обычные файлы (изображения, видео, PDF) по расширению
  const getFileExtension = () => {
    const ext = fileDetails?.name?.split('.').pop()?.toLowerCase();

    // Текстовые файлы отображаем в <pre> с моноширинным шрифтом
    if (fileDetails.isText) {
      return (
        <pre
          style={{
            padding: 16,
            maxHeight: '70vh',
            overflow: 'auto',
            fontFamily: 'monospace',
            background: '#f5f5f5',
            borderRadius: '8px',
          }}>
          {fileTextContent || 'Loading...'}
        </pre>
      );
    }

    // Документы Office/Google Docs конвертированы Dropbox в PDF/HTML
    // Отображаем в iframe для встроенного просмотра
    if (fileDetails.isPreview) {
      return (
        <iframe
          src={fileDetails.link}
          title={fileDetails.name}
          style={{
            width: '85vw',
            height: '85vh',
            border: 'none',
            borderRadius: '8px',
          }}
        />
      );
    }

    // Для остальных файлов определяем тип по расширению
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
      case 'svg':
        return (
          <img
            src={fileDetails.link}
            alt={fileDetails.name}
            style={{
              maxWidth: '85vw',
              maxHeight: '85vh',
              objectFit: 'contain',
            }}
          />
        );

      case 'pdf':
        return (
          <iframe
            src={fileDetails.link}
            title={fileDetails.name}
            style={{
              width: '85vw',
              height: '85vh',
              border: 'none',
              borderRadius: '8px',
            }}
          />
        );

      case 'mp4':
      case 'webm':
      case 'mov':
      case 'avi':
        return (
          <video
            src={fileDetails.link}
            controls
            style={{
              maxWidth: '85vw',
              maxHeight: '85vh',
            }}
          />
        );

      // Для неподдерживаемых типов файлов предлагаем скачать
      default:
        return (
          <div className={styles.downloadContainer}>
            <p className={styles.noPreviewText}>
              Preview not available for this file type
            </p>
            <a
              href={fileDetails.link}
              download={fileDetails.name}
              target="_blank"
              rel="noopener noreferrer">
              <button className={styles.downloadButton}>
                Download {fileDetails.name}
              </button>
            </a>
          </div>
        );
    }
  };

  return (
    <div className={styles.overlay}>
      <button onClick={onClick} className={styles.closeButton}>
        ✕
      </button>
      {loadingFile ? (
        <span className={styles.loader}>
          <Loader className={styles.loadIcon} /> Loading file...
        </span>
      ) : (
        getFileExtension()
      )}
    </div>
  );
};

export default PreviewModal;
