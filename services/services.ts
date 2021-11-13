import { AxiosInstance } from "axios";
import { stringify } from "querystring";
import { api } from "./api";

type SignInRequestData = {
  email: string;
  password: string;
};

export type CaseType = {
  name: string;
  address: string;
  email: string;
  phone: string;
  place: string;
  testDate: string;
  testType: string;
};

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
    return error;
  }

  return;
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

export async function registerCase(data: CaseType, userId: number) {
  const response = await api.post("/cases", {
    name: data.name,
    address: data.address,
    email: data.email,
    phone: data.phone,
    place: data.place,
    testDate: data.testDate,
    testType: data.testType,
    userId,
  });

  const { code, message } = response.data;

  return {
    code,
    message,
  };
}

export async function getCase(apiClient: AxiosInstance, id: any) {
  try {
    const caseInfo = await apiClient.get(`/cases/${id}`);

    const { caso } = caseInfo.data;

    return caso;
  } catch (error) {
    console.log(error);
    return;
  }
}

export function checkToken() {
  api
    .post("logged_user")
    .then((res) => {
      let valid = false;

      const { user } = res.data;

      if (user) valid = true;
      return {
        message: "Token válido",
        code: "SUCCESS",
        valid: true,
      };
    })
    .catch((error) => {
      return {
        message: error,
        code: "SERVER ERROR",
        valid: false,
      };
    });
}
