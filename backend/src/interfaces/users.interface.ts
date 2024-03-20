export interface User {
  id?: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: string;
  token_password?: string;
  created_at: string;
  last_connection: string;
}
