/**
 * industrial-spring-assistant
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as electron from 'electron';
import MainWindow from './window/MainWindow';

const { app, globalShortcut, BrowserWindow } = electron;


export default class Application {

  private mainWindow = new MainWindow();
  public static readonly appEnv = process.env.NODE_ENV;


  initialize(): void {
    this.initializeEvents();
  }

  protected createMainWindow() {
    this.mainWindow.initialize();
    this.mainWindow.create();
    this.initializeGlobalShortcut();
  }

  static isProd() {
    return Application.appEnv === 'production';
  }

  private initializeEvents() {
    app.on('ready', () => {
      this.createMainWindow();
    });

    app.on('activate', () => {
      if (this.mainWindow == null || this.mainWindow.isClosed()) {
        this.createMainWindow();
      }
    });

    app.on('window-all-closed', () => {
      this.mainWindow.preQuitApp();
      app.quit();
    });
  }

  private initializeGlobalShortcut() {
    if (!Application.isProd()) {
      globalShortcut.register('CmdOrCtrl+Alt+P', () => {
        BrowserWindow.getFocusedWindow().webContents.toggleDevTools();
      });
    }
  }
}
