export type AuthInput = {
  login: string;
  password: string;
};

export type SignInData = {
  userId: number;
  login: string;
};

export type AuthResult = {
  accessToken: string;
  userId: number;
  login: string;
};
