/**
 * industrial-spring-assistant
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as electron from 'electron';
import WindowWrapper from './WindowWrapper';

const { app, Menu, ipcMain } = electron;


export default class ApplicationMainWindow extends WindowWrapper {

  create(): void {
    const workArea = electron.screen.getPrimaryDisplay().workAreaSize;
    super.createWindow('index.html', app.getName(),
      workArea.width * 3 / 4, workArea.height - 150);
  }

  afterWindowCreated(): void {
    super.afterWindowCreated();
    this.createApplicationMenu();
  }

  preQuitApp() {
  }

  private static onAboutClicked(): void {
    new WindowWrapper().createWindow('about.html', 'About App', 300, 200);
  }

  private createApplicationMenu(): void {
    const recent: any[] = [];

    const template: any[] = [];

    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          { label: 'About', click: ApplicationMainWindow.onAboutClicked.bind(this) },
          { type: 'separator' },
          { role: 'quit' }
        ]
      });
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
}
