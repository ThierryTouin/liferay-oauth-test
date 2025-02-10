import { AxiosClient } from './axiosClient';
import config from '../configuration/config.json';
import AxiosClientConfig from '../configuration/AxiosClientConfig';

// Définir les types des différentes propriétés et des retours des méthodes
interface EndPointsApimUrls {
  DEBUG: string;
  COMMUNES: string;
}

export class ApimService extends AxiosClient {

  endPointsApimUrls: EndPointsApimUrls = config.endPointsApimUrls;

  appId: string;

  constructor(appId: string, authToken: string) {
    console.log("Initializing APIM Service ...");
    console.log("authToken:" + authToken);

    const oAuth2ClientConfig: AxiosClientConfig  = {
      apiURL: config.apiURLApim,
      envId: "dev",
      headers: { "Content-Type": "application/json" },
    };

    super(oAuth2ClientConfig, authToken);
    this.appId = appId;
  }

  debugRoute(): Promise<any> {
    const url = this.endPointsApimUrls.DEBUG;

    return super
      .getAxiosInstance()
      .get(url)
      .then((response) => {
        console.debug("Returned response from client : " + JSON.stringify({ url, response: response.data }));
        return response.data;
      })
      .catch((error) => {
        super.handlePromiseError(error);
      });
  }

  getCommunes(): Promise<any> {
    const url = this.endPointsApimUrls.COMMUNES;

    return super
      .getAxiosInstance()
      .get(url)
      .then((response) => {
        console.debug("Returned response from client : " + JSON.stringify({ url, response: response.data }, null, 2));
        return response.data;
      })
      .catch((error) => {
        super.handlePromiseError(error);
      });
  }
}
