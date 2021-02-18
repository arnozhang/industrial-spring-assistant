/**
 * industrial-spring-assistant
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as url from 'url';
import * as path from 'path';
import { BrowserWindow } from 'electron';
import Application from '../Application';


export interface WindowParams {
  title: string;

  html?: string;
  search?: string;

  width: number;
  height: number;

  icon?: string;
  show?: boolean;
}

export default class WindowWrapper {

  protected window: BrowserWindow = null;


  initialize() {
  }

  createWindow(params: WindowParams) {
    if (!params.icon) {
      params.icon = 'app-icon.png';
    }

    const hasShowOption = params.show != undefined;
    this.window = new BrowserWindow({
      width: params.width,
      height: params.height,
      center: true,
      title: params.title,
      show: hasShowOption ? params.show : false,
      icon: path.join(__dirname, `../../public/images/${params.icon}`),
    });

    if (!hasShowOption) {
      this.window.once('ready-to-show', () => {
        this.window.show();
      });
    }

    this.window.on('closed', () => {
      this.window = null;
    });

    const htmlFileName = params.html ? params.html : 'index.html';

    this.window.loadURL(url.format({
      pathname: path.join(__dirname, `../public/html/${htmlFileName}`),
      protocol: 'file:',
      search: params.search,
      slashes: true,
    }));

    this.afterWindowCreated();
  }

  getWindow(): BrowserWindow {
    return this.window;
  }

  close(): void {
    this.window = null;
  }

  isClosed(): boolean {
    return !!this.window;
  }

  afterWindowCreated(): void {
    if (!Application.isRelease()) {
      this.window.webContents.openDevTools();
    }
  }
}
