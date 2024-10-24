import { useNavigate } from "@/hooks/useNavigate";
import { useParams } from "next/navigation";

export const useHook = () => {
  const { navigateTo } = useNavigate();

  const usePage = () => {
    const params = useParams();
    const userId = String(params.userId);

    const onSubmit = () => {
      navigateTo("");
    };

    return {
      userId,
      onSubmit,
    };
  };

  return { usePage };
};
