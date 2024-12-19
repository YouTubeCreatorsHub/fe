import { UserType } from './user';

export interface AuthStateType {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (user: UserType) => void;
  logout: () => void;
  updateUser: (data: Partial<UserType>) => void;
}
