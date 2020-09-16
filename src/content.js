import fs from 'fs';
import path from 'path';
import { MENU, TYPES } from 'src/enums';

const contentDir = path.join(process.cwd(), 'content')

export function getBGJson() {
  const filePath = path.join(contentDir, `bg.json`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const json = JSON.parse(fileContents);
  return json;
}

export function getNavJson() {
  const filePath = path.join(contentDir, `nav.json`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const json = JSON.parse(fileContents);
  return parseNav(json);
}

const parseNav = (node, path = '/') => {
  if (node.template == MENU.SUBMENU) {
    node.path = path == '/' ? `/${node.slug}` : `${path}/${node.slug}`;
    let items = node.items.map(item => {
      return parseNav(item, node.path);
    })
    items.unshift(node);
    return items.flat();
  } else {
    node.path = node.post.replace(/\.json$/, '').replace(/content/, '');
    node.slug = node.path.split('/').pop();
    return node
  }
}

export function getNavPaths() {
  let navJson = getNavJson();
  return navJson.map(node => {
    return {
      params: {
        slug: node.path.split('/').slice(1)
      }
    }
  })
}

function checkFileExistsSync(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.constants.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}

export function getDataForPath(navPath) {
  const filePath = path.join(contentDir, `${navPath}.json`);
  const fileExists = checkFileExistsSync(filePath);
  if (fileExists) {

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContents);
    return {
      path: navPath,
      pageData: jsonData
    }
  } else {
    return {
      path: navPath,
      pageData: {
        template: TYPES.BLANK
      }
    }
  }
}
