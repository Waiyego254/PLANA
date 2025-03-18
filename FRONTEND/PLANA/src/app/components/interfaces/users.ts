export interface UserRegister {
    username: string;
    email: string;
    password: string;
  }

  export interface TokenDetails {
    info?: {
      id: string;
      username: string;
      email: string;
      name: string;
      role: string;
    };
    error?: {
      message: string;
    };
    message?: string;
    role?: string;
    user_id?: string;
    token?: string;
    username?: string;
  }