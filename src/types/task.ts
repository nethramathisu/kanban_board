export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "inprogress" | "done";
};
export type Status = "todo" | "inprogress" | "done";