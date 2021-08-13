export type RoleQueryForm = {
  roleName: string;
}

export type RoleColumns = {
  _id: string;
  roleName: string;
  remark: string;
  permissionList: PermissionList;
  updateTime: string;
  createTime: string;
}

export type PermissionList = {
  checkedKeys: string[];
  halfCheckedKeys: string[];
}
