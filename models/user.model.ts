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
  likes?: { id: string; blogPostId: string }[];
  comments?: { id: string; blogPostId: string }[];
}

export interface UserSmallModel {
  id?: string;
  username: string;
  email: string;
  role: RoleType;
  createdAt?: Date;
  likes?: { id: string; blogPostId: string }[];
  comments?: { id: string; blogPostId: string }[];
}

export interface UserModel extends UserSmallModel {
  lastName: string;
  firstName: string;
  updatedAt?: Date;
}


export type RoleType = "PUBLIC" | "ADMIN" | "USER";
