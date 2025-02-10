import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AxiosClientConfig from '../configuration/AxiosClientConfig';

const NETWORK_ERROR = "Network Error";
const DEV_ENV = "dev";

// Définir l'interface pour la configuration du client


export class AxiosClient {

  private _axiosInstance: AxiosInstance;
  private standardTimeout: number = 10000;
  private envId: string;
  private headers: Record<string, string>;
  private apiURL: string;

  constructor(clientConfig: AxiosClientConfig, authorizationToken?: string) {

    console.log('Creating Rest Client using configuration : ' + JSON.stringify(clientConfig));

    const { apiURL, headers, envId } = clientConfig;

    if (!apiURL) {
      throw new Error("Invalid apiUrl : it is mandatory to provide a valid apiUrl");
    }
    this.apiURL = apiURL;

    if (!envId) {
      throw new Error("Invalid envId : it is mandatory to provide a valid envId");
    }
    this.envId = envId;

    if (!headers) {
      throw new Error("Invalid header : it is mandatory to provide a valid header");
    }
    this.headers = headers;

    this._axiosInstance = this.createClient(authorizationToken);
  }

  getAxiosInstance(): AxiosInstance {
    return this._axiosInstance;
  }

  private createClient(authorizationToken?: string): AxiosInstance {
    const params: AxiosRequestConfig = {
      baseURL: this.apiURL,
      headers: this.headers,
      withCredentials: true,
      timeout: 20000,
    };

    console.log('Creating Axios Client using configuration : ' + JSON.stringify(params));
    console.log("Axios module:", axios);
    console.log("Axios.create exists:", typeof axios.create);

    const axiosApiInstance: AxiosInstance = axios.create(params);

    axiosApiInstance.interceptors.request.use(
      (config) => {
        if (authorizationToken) {
          console.debug("Adding token [" + authorizationToken + "] to header");
          config.headers['Authorization'] = 'Bearer ' + authorizationToken;
        } else {
          console.debug("No authorization token provided");
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return axiosApiInstance;
  }

  handlePromiseError(error: any): void {
    if (error.response) {
      console.error('Error bad returned code', error.response);
    } else if (error.request) {
      console.error('Error no responses received', error.request);
    } else {
      console.error('Error', error.message);
    }

    if (error.message === NETWORK_ERROR && this.envId === DEV_ENV) {
      console.error('Message', error.message + " : if you are working with self-signed certificate. You need to add a security exception on your browser.");
    } else {
      console.error('Message', error.message);
    }

    throw new Error('Error : ' + error);
  }

  getEnvId(): string {
    return this.envId;
  }
}
