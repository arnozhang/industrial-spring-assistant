/**
 * industrial-spring-assistant
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as electron from 'electron';
import { SubPages } from "@@/common/commonDeclares";
import WindowWrapper from './WindowWrapper';

const { app, Menu } = electron;


export default class MainWindow extends WindowWrapper {

  create(): void {
    const workArea = electron.screen.getPrimaryDisplay().workAreaSize;
    super.createWindow({
      title: app.getName(),
      width: workArea.width * 3 / 4,
      height: workArea.height - 150,
    });
  }

  afterWindowCreated(): void {
    super.afterWindowCreated();
    this.createApplicationMenu();
  }

  preQuitApp() {
  }

  private static onAboutClicked(): void {
    new WindowWrapper().createWindow({
      title: '关于',
      search: `page=${SubPages.AboutPage}`,
      width: 400,
      height: 300,
    });
  }

  private createApplicationMenu(): void {
    const template: any[] = [];
    const aboutSubMenu = {
      label: app.getName(),
      submenu: [
        { label: '关于', click: MainWindow.onAboutClicked.bind(this) },
        { type: 'separator' },
        { role: 'quit' },
      ],
    };

    if (process.platform === 'darwin') {
      template.unshift(aboutSubMenu);
    } else {
      template.push(aboutSubMenu);
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
}
