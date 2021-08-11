export type MenuQueryForm = {
  menuName: string;
  menuState: 1 | 2;
}

export type MenuItem = {
  _id: string;
  menuName: string;
  icon: string;
  menuType: 1 | 2;
  menuCode: string;
  path: string;
  component: string;
  menuState: 1 | 2;
  createTime: string;
  parentId: string[];
  action: any;
  children: MenuItem[];
}

export type MenuRoutes = {
  name: string;
  path: string;
  meta: {
    title: string;
    [k: string]: string;
  },
  component: any;
}
