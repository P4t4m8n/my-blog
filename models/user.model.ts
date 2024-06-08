export interface UserDTO {
  id?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface UserSmallModel {
  id?: string;
  username: string;
  email: string;
  role: RoleType;
  createdAt?: Date;
  likes?: { id: string; blogId: string }[];
  comments?: { id: string; blogId: string }[];
}

export interface UserModel extends UserSmallModel {
  lastName: string;
  firstName: string;
}

export type RoleType = "PUBLIC" | "ADMIN" | "USER";
