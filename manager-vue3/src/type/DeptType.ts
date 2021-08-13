import { UserDeptType } from './UserType'

export type QueryDeptForm = {
  deptName: string;
}

export type DeptColumn = {
  deptName: string;
  userName: string;
  userEmail: string;
  updateTime: string;
  createTime: string;
  parentId: string[];
  user: Partial<UserDeptType>;
}
