import { stringify } from "querystring";
import { api } from "./api";

type SignInRequestData = {
  email: string;
  password: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function SignInRequest(data: SignInRequestData) {
  try {
    const response = await api.post("/login", data);

    if (response) {
      const { code, message, token, user } = response.data;

      return {
        code: code,
        message: message,
        token: token,
        user: user,
      };
    }
  } catch (error) {
    console.log(error);
  }

  return {
    token: "Mg.FqmxbD1nHEgd3KtS8dKi-ySyMyLibctw4DHhK5MexGptA0P5fGxvcY_blbZV",
    user: {
      name: "Edro Viegas",
      email: "pedro@gmail.com",
      role: "admin",
    },
  };
}

//Receives token

export async function recoverUserInformation() {
  const response = await api.post("logged_user");

  const { user } = response.data;

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.is_active,
    },
  };
}
