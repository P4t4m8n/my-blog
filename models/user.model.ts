export interface UserDTO {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: RoleType
  createdAt: Date;
  updatedAt?: Date;
}

export interface UserModel{
  id?: string;
  username: string;
  email: string;
  role: RoleType
}


export type RoleType = "public" | "admin" | "user";
