import {Dropbox} from 'dropbox';
import {dropboxAuth} from './dropboxAuth';

class DropboxService {
  // Singleton паттерн: создаем клиент один раз и переиспользуем
  // эффективнее, чем создавать новый клиент для каждого запроса
  private dbx: Dropbox | null = null;

  private getClient(): Dropbox {
    const token = dropboxAuth.getToken();

    if (!token) {
      throw new Error('Not authenticated. Please provide an access token.');
    }

    // Создаем клиент только если его еще нет (lazy initialization)
    if (!this.dbx) {
      this.dbx = new Dropbox({accessToken: token});
    }

    return this.dbx;
  }

  // Сбрасываем клиент при смене токена или выходе
  resetClient(): void {
    this.dbx = null;
  }

  // Валидация токена: создаем временный клиент для проверки
  // не используем основной dbx, т.к. токен еще не сохранен
  async validateToken(token: string): Promise<boolean> {
    try {
      const tempClient = new Dropbox({accessToken: token});
      // Простой запрос для проверки валидности токена
      await tempClient.usersGetCurrentAccount();
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }

  async listFiles(path: string = '') {
    try {
      const dbx = this.getClient();
      const response = await dbx.filesListFolder({path});
      return response.result.entries;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  async getAccountInfo() {
    try {
      const dbx = this.getClient();
      const response = await dbx.usersGetCurrentAccount();
      return response.result;
    } catch (error) {
      console.error('Error getting account info:', error);
      throw error;
    }
  }

  async getFile(path: string) {
    try {
      const dbx = this.getClient();
      const response = await dbx.filesGetTemporaryLink({path});
      return response.result;
    } catch (error) {
      console.error('Error getting file:', error);
      throw error;
    }
  }
  async getFileContent(path: string) {
    try {
      const dbx = this.getClient();
      const response = await dbx.filesDownload({path});
      return response.result;
    } catch (error) {
      console.error('Error getting file content:', error);
      throw error;
    }
  }

  // Скачивание файла: создаем временную ссылку на blob и програмно кликаем по ней
  // Это стандартный способ скачивания файлов в браузере
  async downloadFile(path: string, fileName: string) {
    try {
      const dbx = this.getClient();
      const response = await dbx.filesDownload({path});
      const blob = (response.result as any).fileBlob;

      // Создаем временную ссылку на blob
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      // Временно добавляем в DOM, кликаем, удаляем
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Освобождаем память, удаляя ссылку на blob
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }

  // Получение предпросмотра: Dropbox конвертирует документы в PDF/HTML
  // Создаем blob URL для отображения в iframe
  async getPreview(path: string) {
    try {
      const dbx = this.getClient();
      const response = await dbx.filesGetPreview({path});

      const blob = (response.result as any).fileBlob;
      // Создаем URL для blob, чтобы можно было использовать в iframe/img
      const previewUrl = URL.createObjectURL(blob);

      return {
        link: previewUrl,
        metadata: response.result,
      };
    } catch (error) {
      console.error('Error getting preview:', error);
      throw error;
    }
  }
}

export const dropboxService = new DropboxService();
