import { useRouter } from "next/navigation";

export const useNavigate = () => {
  const router = useRouter();

  const navigateTo = (url: string) => {
    // 現在のオリジン（プロトコルとホスト部分）を動的に取得
    const origin = typeof window !== "undefined" ? window.location.origin : "";

    // 現在のオリジンに基づいてエンドポイントを生成
    router.push(`${origin}/${url}`);
  };

  return { navigateTo };
};
