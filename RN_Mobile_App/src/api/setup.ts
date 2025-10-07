import { getBaseURL } from "../utils/function";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';


export const apiCall =async <TRes>( httpMethod: HttpMethod,
    endPoint: string,
    token: string,
    optionalHeaders: object | {},
    data: string | unknown[]) : Promise<TRes> => {
    // const storedState = await AsyncStorage.getItem('authState');
        
        
    // const access_token = JSON.parse(storedState)?.access_token || token;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if (token) {
        myHeaders.append("authorization", `Bearer ${token}`);
        
    }

    const requestOptions = {
        method: httpMethod,
        headers: myHeaders,
        body: data,
        redirect: "follow"
      };

    const baseURL = getBaseURL();
    console.log('baseURL: ',baseURL);
    
    try {
       const res = await fetch(baseURL + endPoint, 
            requestOptions as any
       )
        const statusCode = res.status;
        const successCodes=[200,201]
        const result = await res.json();
        
        
        if (successCodes.some(()=>statusCode)) {
            return result;
        } else { 
            throw new Error(result);            
        }
        
    } catch (error) {
        
        throw error;
    }
   
}