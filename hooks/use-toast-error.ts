import { toast } from "sonner";

export function useToastError() {
  return (message: string) => {
    toast.error(message, {
      style: { background: "#dc2626", color: "#fff" },
      duration: 5000,
    });
  };
}
