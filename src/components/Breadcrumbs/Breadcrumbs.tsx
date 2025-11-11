import styles from './Breadcrumbs.module.css';

interface BreadcrumbsProps {
  historyPath: string[];
  onNavigate: (path: string) => void;
}

const Breadcrumbs = ({historyPath, onNavigate}: BreadcrumbsProps) => {
  const getName = (path: string) => {
    if (path === '') return 'Home';
    return path.split('/').pop() || 'Unknown';
  };

  return (
    <div className={styles.breadcrumbs}>
      {historyPath.map((path, index) => {
        const isLast = index === historyPath.length - 1;
        return (
          <span key={index} className={styles.current}>
            {isLast ? (
              <span>{getName(path)}</span>
            ) : (
              <button
                className={styles.button}
                onClick={() => onNavigate(path)}>
                {getName(path)}
              </button>
            )}
            {!isLast && <span className={styles.separator}> › </span>}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
