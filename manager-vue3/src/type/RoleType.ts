export type RoleQueryForm = {
  roleName: string;
}

export type RoleColumns = {
  _id: string;
  roleName: string;
  remark: string;
  permissionList: string[];
  updateTime: string;
  createTime: string;
}
