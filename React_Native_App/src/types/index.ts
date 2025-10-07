
export type AuthStackParamList= {
    Login: undefined;
    Registration: undefined;
  };
  export type HomeStackParamList= {
    Home: undefined;
    MyCart: undefined;
    MyOrders: undefined;
  };
  
export interface ILoginApiRes { 
  token: string;
  user: IUser
}
export interface IProducApiRes { 
  token: string;
  user: IUser
}

export interface IPlaceOrderApiRes { 
  userId: string,  
  total:number,
  status: "placed",
}

export interface IUser { 
  email: string;
  id: number,
  name: string
}


export interface IErrorApi { 
  error:string
}
export interface IProduct {
  id: string;
  title: string;
  price: number;
  category: string;
}

export interface IOrder {
  id: string;
  items: IProduct[];
  total: number;
  status:string
}

export interface IAuthState {
    isAuthenticated: boolean,
    access_token: string|null,    
    error: string|null,    
    loading: boolean,
    userDetails:IUser | null
}
 
export type IAuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: IAuthState }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };