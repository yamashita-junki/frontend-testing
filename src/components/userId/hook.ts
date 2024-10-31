import { useNavigate } from '@/hooks/useNavigate';

export const useHook = () => {
  const { navigateTo } = useNavigate();

  const usePage = () => {
    const onSubmit = () => {
      navigateTo('');
    };

    return {
      onSubmit
    };
  };

  return { usePage };
};
