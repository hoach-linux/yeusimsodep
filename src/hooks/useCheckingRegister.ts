import { useNavigate } from "react-router-dom";

export const useCheckingRegister = (link: string) => {
  const navigate = useNavigate();
  const registered = [localStorage.getItem("sb-wzlfkkdcqditzrbxeioy-auth-token"), localStorage.getItem("directus_token")];

  const checkRegister = () => {
    if (registered[0] && registered[1]) return true;

    return navigate(link);
  };
  const checkNotRegister = () => {
    if (!registered[0] && !registered[1]) return true;

    return navigate(link);
  };

  return [checkRegister, checkNotRegister];
};
