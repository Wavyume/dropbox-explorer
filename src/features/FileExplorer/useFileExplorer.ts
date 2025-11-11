import {useState, useEffect} from 'react';
import {dropboxService} from '../../services/dropbox/dropboxService';
import type {files} from 'dropbox';

type DropboxFolder = files.FolderMetadataReference;
type DropboxFiles = files.FileMetadataReference;

export const useFileExplorer = () => {
  const [currentPath, setCurrentPath] = useState('');
  // История навигации: массив путей от корня до текущей папки
  // Используется для breadcrumbs и навигации назад
  const [historyPath, setHistoryPath] = useState<string[]>(['']);
  const [files, setFiles] = useState<DropboxFiles[]>([]);
  const [folders, setFolders] = useState<DropboxFolder[]>([]);
  const [fileDetails, setFileDetails] = useState<{
    link: string;
    name: string;
    isText?: boolean;
    isPreview?: boolean;
  }>({
    link: '',
    name: '',
  });
  const [fileTextContent, setFileTextContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [error, setError] = useState<string>('');

  const loadFolder = async (path: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await dropboxService.listFiles(path);
      // Dropbox API возвращает массив с метаданными, где тип определяется полем '.tag'
      const folders = response.filter((elem) => elem['.tag'] === 'folder');
      const files = response.filter((elem) => elem['.tag'] === 'file');

      setFolders(folders);
      setFiles(files);
      setCurrentPath(path);
    } catch (error) {
      console.error('Error loading folder:', error);
      setError('Failed to load folder. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openFolder = (folderPath: string) => {
    try {
      // Проверяем, не пытаемся ли открыть ту же папку, что уже открыта
      // Это предотвращает дублирование в истории при повторных кликах
      const isCopy = historyPath[historyPath.length - 1] === folderPath;
      if (!isCopy) {
        setHistoryPath([...historyPath, folderPath]);
        loadFolder(folderPath);
      }
    } catch (error) {
      console.error('Error opening folder:', error);
      setError('Failed to open folder. Please try again.');
    }
  };

  const goBack = () => {
    try {
      if (historyPath.length > 1) {
        const newHistory = [...historyPath];
        newHistory.pop();
        const previousPath = newHistory[newHistory.length - 1];

        setHistoryPath(newHistory);
        loadFolder(previousPath);
      }
    } catch (error) {
      console.error('Error going back:', error);
      setError('Failed to navigate back. Please try again.');
    }
  };

  const goHome = () => {
    try {
      setHistoryPath(['']);
      loadFolder('');
    } catch (error) {
      console.error('Error going home:', error);
      setError('Failed to navigate home. Please try again.');
    }
  };

  // Навигация по breadcrumbs: обрезаем историю до выбранной папки
  // Например, если история [root, /a, /a/b, /a/b/c] и кликнули на /a,
  // то новая история будет [root, /a]
  const onNavigate = (path: string) => {
    try {
      const targetIndex = historyPath.indexOf(path);
      const newHistory = historyPath.slice(0, targetIndex + 1);
      const isCopy = historyPath[historyPath.length - 1] === path;
      if (!isCopy) {
        setHistoryPath(newHistory);
        loadFolder(path);
      }
    } catch (error) {
      console.error('Error navigating:', error);
      setError('Failed to navigate. Please try again.');
    }
  };

  // Открытие файла с определением типа и выбором способа отображения
  // Разные типы файлов требуют разных API методов Dropbox
  const openFile = async (path: string, fileName: string) => {
    setError('');
    const ext = fileName.split('.').pop()?.toLowerCase();

    // Расширения, которые Dropbox может конвертировать в PDF для предпросмотра
    const pdfPreviewExts = [
      'ai',
      'doc',
      'docm',
      'docx',
      'eps',
      'gdoc',
      'gslides',
      'odp',
      'odt',
      'pps',
      'ppsm',
      'ppsx',
      'ppt',
      'pptm',
      'pptx',
      'rtf',
    ];

    // Таблицы конвертируются в HTML для предпросмотра
    const htmlPreviewExts = ['csv', 'ods', 'xls', 'xlsm', 'gsheet', 'xlsx'];

    // Текстовые файлы читаем напрямую через FileReader
    const textFileExts = [
      'txt',
      'md',
      'json',
      'js',
      'ts',
      'jsx',
      'tsx',
      'html',
      'css',
      'xml',
      'log',
    ];

    setLoadingFile(true);

    try {
      if (
        pdfPreviewExts.includes(ext || '') ||
        htmlPreviewExts.includes(ext || '')
      ) {
        const preview = await dropboxService.getPreview(path);
        setFileDetails({
          link: preview.link,
          name: fileName,
          isText: false,
          isPreview: true,
        });
        setFileTextContent('');
      } else if (textFileExts.includes(ext || '')) {
        // Для текстовых файлов скачиваем содержимое и читаем через FileReader
        // Это позволяет отобразить текст напрямую в модальном окне
        const file = await dropboxService.getFileContent(path);

        const reader = new FileReader();
        reader.onload = () => {
          setFileTextContent(reader.result as string);
          setFileDetails({
            link: '',
            name: fileName,
            isText: true,
          });
          setLoadingFile(false);
        };
        reader.onerror = () => {
          console.error('Error reading file');
          setLoadingFile(false);
        };
        reader.readAsText((file as any).fileBlob);
        return; // Ранний выход, т.к. setLoadingFile вызывается в колбэке
      } else {
        // Для остальных файлов (изображения, видео, PDF) получаем временную ссылку
        // Dropbox генерирует ссылку, которая действительна 4 часа
        const file = await dropboxService.getFile(path);
        setFileDetails({
          link: file.link,
          name: fileName,
          isText: false,
          isPreview: false,
        });
        setFileTextContent('');
      }
    } catch (error) {
      console.error('Error opening file:', error);
      setError('Failed to open file. Please try again.');
    } finally {
      setLoadingFile(false);
    }
  };

  const downloadFile = async (path: string, fileName: string) => {
    setError('');
    try {
      await dropboxService.downloadFile(path, fileName);
    } catch (error) {
      console.error('Error downloading file:', error);
      setError('Failed to download file. Please try again.');
    }
  };
  useEffect(() => {
    loadFolder('');
  }, []);

  return {
    folders,
    files,
    currentPath,
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
  };
};
