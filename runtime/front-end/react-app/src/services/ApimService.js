import {AxiosClient} from './common/AxiosClient.js';
//import {StorageService} from './common/StorageService.js';
import config from '../config/config.json';

export class ApimService extends AxiosClient {

    endPointsApimUrls = config.endPointsApimUrls;

    appId

    constructor(appId) {

        console.log("Initializing APIM Service ...");

        const oAuth2ClientConfig = {
            "apiURL": config.apiURLApim,
            "envId": "dev",
            "headers": ["Content-Type: application/json"]
        }

        //const storageService = new StorageService(appId);
        //const authToken = storageService.getAccessToken();
        const authToken = "sddsffsdsdfdfsdsf51654654";
        super(oAuth2ClientConfig, authToken);

        this.appId = appId;

    };

    debugRoute() {

        const url = this.endPointsApimUrls.DEBUG;

        return super.getAxiosInstance()
            .get(url)
            .then((response) => {
                console.debug("Returned response from client : " + JSON.stringify({url, response:response.data}));
                return response.data;
            })
            .catch((error) => {
                super.handlePromiseError(error);
            })

    }

    getCommunes() {

        const url = this.endPointsApimUrls.COMMUNES;

        return super.getAxiosInstance()
            .get(url)
            .then((response) => {
                console.debug("Returned response from client : " + JSON.stringify({url, response:response.data}, null, 2));
                return response.data;
            })
            .catch((error) => {
                super.handlePromiseError(error);
            }) 

    }

}