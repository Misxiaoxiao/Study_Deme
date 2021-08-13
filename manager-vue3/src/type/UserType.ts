export type FormItem = {
  userId?: string;
  userName?: string;
  state?: 0 | 1 | 2 | 3;
}

export type QueryUserForm = {
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

export interface UserDeptType extends Partial<UserInfo> {
  _id: string;
  createTime: string;
  children: DeptList;
}

export type DeptList = UserDeptType[]

export type UserInfo = {
  userName: string;
  userId: string;
  userEmail: string;
  token: string;
  state: number;
  roleList: string[];
  role: number;
  deptId: string[]
};
