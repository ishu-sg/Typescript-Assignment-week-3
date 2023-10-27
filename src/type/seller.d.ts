export interface BasicUserDetailResponse {
  email: string;
  id: string;
}

export interface LoggedInSeller {
  token: string;
}

export interface RegisterSeller {
  id:string,
  name: string;
  email:string,
}
