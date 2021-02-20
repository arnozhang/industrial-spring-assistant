/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/19
 */

import * as React from 'react';
import { Menu } from "antd";
import { History } from "history";
import { JsUtils } from "js-utils-lite";


declare type BuildMenuUrlFn = () => string;

export interface INavMenu {

  menuPath: string;
  displayName: string;
  matchMenuPaths?: RegExp;

  icon?: string | React.ReactNode;
  menuUrl?: string | BuildMenuUrlFn;

  subMenus?: INavMenu[];
}

interface SelectedMenuInfo {

  menuPath: string;
  parentMenuPath?: string;
}

export function findSelectedMenu(
  parent: INavMenu | undefined,
  navMenus: INavMenu[] | undefined): SelectedMenuInfo | undefined {

  if (!navMenus) {
    return undefined;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const item of navMenus) {
    if (JsUtils.isNotEmpty(item.subMenus)) {
      const find = findSelectedMenu(item, item.subMenus);
      if (find) {
        return find;
      }
    }

    let matched = false;
    const path = `/${item.menuPath}`;

    if (item.matchMenuPaths) {
      matched = item.matchMenuPaths.test(path);
    } else {
      matched = window.location.href.indexOf(path) > 0;
    }

    if (matched) {
      return {
        menuPath: item.menuPath,
        parentMenuPath: parent?.menuPath,
      };
    }
  }

  return undefined;
}

export function createMenuItem(history: History, item: INavMenu) {
  const iconElement = !JsUtils.isString(item.icon) ? item.icon : (
    <img
      src={item.icon as string}
      alt={item.displayName}
      style={{ marginRight: 10 }} />
  );

  if (JsUtils.isNotEmpty(item.subMenus)) {
    return (
      <Menu.SubMenu
        key={item.menuPath}
        title={item.displayName}
        icon={iconElement}
      >
        {item.subMenus?.map(sub => createMenuItem(history, sub))}
      </Menu.SubMenu>
    );
  }

  const onClick = item.menuUrl ? () => {
    const url = JsUtils.isString(item.menuUrl)
      ? (item.menuUrl as string)
      : (item.menuUrl as BuildMenuUrlFn)();

    history.push(url);
  } : undefined;

  return (
    <Menu.Item
      key={item.menuPath}
      icon={iconElement}
      onClick={onClick}
    >

      {item.displayName}
    </Menu.Item>
  );
}

export function createMenu(history: History, menus: INavMenu[]) {
  const selectedMenu = findSelectedMenu(undefined, menus) || { menuPath: '', };

  return (
    <Menu
      mode="inline"
      theme="light"
      defaultSelectedKeys={[selectedMenu.menuPath]}
      defaultOpenKeys={selectedMenu.parentMenuPath ? [selectedMenu.parentMenuPath] : undefined}
    >
      {menus.map(item => {
        return createMenuItem(history, item);
      })}
    </Menu>
  );
}
