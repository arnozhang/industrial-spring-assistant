/**
 * industrial-spring-assistant
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as queryString from 'query-string';

export function parseUrlParams(): any {
  return queryString.parse(window.location.search) || {};
}
