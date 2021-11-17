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

export type ContactType = {
  name: string;
  email: string;
  phone: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: number;
  created_at: string;
  password: string;
  confirm_password: string;
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

export async function logout() {
  const response = await api.post(`/logout`);

  const { code, message } = response.data;

  return {
    code,
    message,
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

export async function registerUser(user: UserType) {
  const response = await api.post("/users", {
    name: user.name,
    email: user.email,
    role: user.role,
    password: user.password,
  });

  const { code, message } = response.data;

  return {
    code,
    message,
  };
}

export async function getUsers(apiClient: AxiosInstance) {
  try {
    const response = await apiClient.get(`/users`);

    const { users } = response.data;

    return users;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getCurrentUser(apiClient: AxiosInstance) {
  const response = await apiClient.post("logged_user");

  const { code, message, user } = response.data;
  return user;
}

export async function changeUserState(userId: number) {
  const response = await api.get(`/users/state/${userId}`);

  const { code, message } = response.data;

  return {
    code,
    message,
  };
}

export async function removeUser(userId: number) {
  const response = await api.delete(`/users/${userId}`);

  const { code, message } = response.data;

  return {
    code,
    message,
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

export async function getCases(apiClient: AxiosInstance) {
  try {
    const response = await apiClient.get(`/cases`);

    const { cases } = response.data;

    return cases;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function searchCase(apiClient: AxiosInstance, data: any) {
  try {
    const response = await apiClient.post(`/cases/search`, data);

    return response.data;
  } catch (error) {
    console.log(error);
    return { code: error, message: "Ocorreu um erro ao pesquisar" };
  }
}

export async function removeCase(caseId: number) {
  const response = await api.delete(`/cases/${caseId}`);

  const { code, message } = response.data;

  return {
    code,
    message,
  };
}

export async function registerContact(data: ContactType, caseId: number) {
  const response = await api.post("/contacts", {
    name: data.name,
    email: data.email,
    phone: data.phone,
    caseId,
  });

  const { code, message } = response.data;

  return {
    code,
    message,
  };
}

export async function removeContact(contactId: number) {
  const response = await api.delete(`/contacts/${contactId}`);

  const { code, message } = response.data;

  return {
    code,
    message,
  };
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
