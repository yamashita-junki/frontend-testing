import { useRouter } from "next/navigation";

export const useNavigate = () => {
  const router = useRouter();

  const navigateTo = (url: string) => {
    // TODO:エンドポイント動的にする
    router.push(`http://localhost:3000/${url}`);
  };

  return { navigateTo };
};
