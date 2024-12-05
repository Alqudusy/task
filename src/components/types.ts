export interface Task {
  id: string | Date | number;
  subject: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

export interface SavedUserInfo {
  name: string;
  email: string;
  tasks: [];
}
