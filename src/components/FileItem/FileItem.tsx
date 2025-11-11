import {
  File,
  FileText,
  Image,
  FileSpreadsheet,
  FileArchive,
  Download,
} from 'lucide-react';
import styles from './FileItem.module.css';
import {useState} from 'react';

interface FileItemProps {
  name: string;
  path: string;
  onClick: () => void;
  onDownload: (path: string, name: string) => void;
}

const FileItem = ({name, path, onClick, onDownload}: FileItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getFileIcon = () => {
    const ext = name.split('.').pop()?.toLowerCase();

    switch (ext) {
      case 'txt':
      case 'doc':
      case 'docx':
      case 'pdf':
        return <FileText className={styles.icon} size={20} strokeWidth={2} />;

      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return <Image className={styles.icon} size={20} strokeWidth={2} />;

      case 'xls':
      case 'xlsx':
      case 'csv':
        return (
          <FileSpreadsheet className={styles.icon} size={20} strokeWidth={2} />
        );

      case 'zip':
      case 'rar':
      case '7z':
        return (
          <FileArchive className={styles.icon} size={20} strokeWidth={2} />
        );

      default:
        return <File className={styles.icon} size={20} strokeWidth={2} />;
    }
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload(path, name);
  };

  return (
    <div
      className={styles.fileItemWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <button className={styles.fileItem} onClick={onClick}>
        {getFileIcon()}
        <span className={styles.name}>{name}</span>
        {isHovered && (
          <button
            className={styles.downloadButton}
            onClick={handleDownloadClick}
            title="Download file"
            aria-label={`Download ${name}`}>
            <Download size={18} />
          </button>
        )}
      </button>
    </div>
  );
};

export default FileItem;
