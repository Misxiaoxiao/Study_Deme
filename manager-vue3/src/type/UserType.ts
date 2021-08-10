export type FormItem = {
  userId?: string;
  userName?: string;
  state?: 0 | 1 | 2 | 3;
}

export type CreateForm = {
  userName?: string;
  userEmail?: string;
  mobile?: string;
  job?: string;
  state?: 1 | 2 | 3;
  roleList?: string[];
  deptId?: string[];
}

export type RoleType = {
  _id: string;
  roleName: string;
}

export type RoleList = RoleType[]

export type DeptType = {
  _id: string;
  userName: string;
  userId: string;
  userEmail: string;
  parentId: string[];
  deptName: string;
  createTime: string;
  children: DeptList;
}

export type DeptList = DeptType[]

export type Action = 'add' | 'edit'
