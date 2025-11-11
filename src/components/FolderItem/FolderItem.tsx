import {Folder, ChevronRight} from 'lucide-react';
import styles from './FolderItem.module.css';

interface FolderProps {
  name: string;
  onClick?: () => void;
}

const FolderItem = ({name, onClick}: FolderProps) => {
  return (
    <div className={styles.folderItem} onClick={onClick}>
      <Folder className={styles.icon} size={22} strokeWidth={2} />
      <span className={styles.name}>{name}</span>
      <ChevronRight className={styles.arrow} size={18} strokeWidth={2} />
    </div>
  );
};

export default FolderItem;
