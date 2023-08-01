import { useNavigate } from "react-router-dom";

export const useCheckingRegister = (link: string) => {
  const navigate = useNavigate();
  const registered = localStorage.getItem("sb-wzlfkkdcqditzrbxeioy-auth-token");

  const checkRegister = () => {
    if (registered) return true;

    return navigate(link);
  };
  const checkNotRegister = () => {
    if (!registered) return true;

    return navigate(link);
  };

  return [checkRegister, checkNotRegister];
};
