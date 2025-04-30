import { toast } from "sonner";

export function useToastSuccess() {
  return (message: string) => {
    toast.success(message, {
      style: { background: "#16a34a", color: "#fff" },
      duration: 4000,
    });
  };
}
