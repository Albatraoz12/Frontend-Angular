export interface UserList {
  message: Message[];
}

export interface Message {
  id: number;
  user_id: number;
  list_name: string;
  created_at: string;
  updated_at: string;
}
