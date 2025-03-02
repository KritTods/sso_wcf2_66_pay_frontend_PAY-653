import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';

interface UserInfo {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  ssoBranchCode: string;
  title: string;
  active: string;
}

interface Token {
  aud: string;
  sub: string;
  userInfo: UserInfo;
  roles: string[];
  scope: string[];
  iss: string;
  exp: number;
  iat: number;
}

export const getTokenDecode = (): Token | undefined => {
  const token = Cookies.get('accessToken');
  if (!token) {
    return undefined;
  }

  return decodeJwt(token);
};

export const getUserLoginFullName = (): string | undefined => {
  const token = Cookies.get('accessToken');
  if (!token) {
    return undefined;
  }

  const decodeJwt = getTokenDecode();

  return `${decodeJwt?.userInfo.firstName} ${decodeJwt?.userInfo.lastName}`;
};
