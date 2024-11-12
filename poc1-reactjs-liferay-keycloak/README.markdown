## 1. Project technical description

#### Traefik network

```mermaid
graph  LR

%% Nodes

RProxy[Traefik<br>traefik.dev.local]
Portal[Liferay<br>portal.dev.local]
Apim[Apim<br>apim.dev.local]
App1[Apim<br>app1.dev.local]
C([client])
SSO([Keycloak<br>sso.dev.local])


%% Links	

C -- https --> RProxy;
subgraph Environement
    RProxy -- http --> SSO;
    RProxy -- http --> Portal;
    RProxy -- http --> App1;
    RProxy -- http --> Apim;
end

%% Defining node styles

  classDef plain fill:#ddd,stroke:#fff,stroke-width:4px,color:#000;
  classDef k8s fill:#326ce5,stroke:#fff,stroke-width:4px,color:#fff;
  classDef cluster fill:#fff,stroke:#bbb,stroke-width:2px,color:#326ce5;
  
%% Assigning styles to nodes

  class Portal,SSO,Apim k8s;
  class C plain;
  class RProxy cluster;
```

#### Architecture

```mermaid

graph  LR

%% Nodes

APP1[ReactJS<br>app1.dev.local]
Portal[Liferay<br>portal.dev.local]
APIM[Kong<br>apim.dev.local]
API[API]
C([client])
SSO([Keycloak<br>sso.dev.local])


%% Links	

C <--> APP1 ;
C <--> Portal ;
subgraph Environement
    APP1 <--> SSO;
	APP1 <--> APIM;
	APIM <--> SSO;
	Portal <--> SSO;
	%%APP1-.servi par.-SRV;
end

APIM <--> API;

%% Defining node styles

  classDef plain fill:#ddd,stroke:#fff,stroke-width:4px,color:#000;
  classDef k8s fill:#326ce5,stroke:#fff,stroke-width:4px,color:#fff;
  classDef cluster fill:#fff,stroke:#bbb,stroke-width:2px,color:#326ce5;
  
%% Assigning styles to nodes

  class Portal,APP1,APIM,API,SSO k8s;
  class C plain;
  class cluster cluster;
```
## 3. Usefull commands & tips

#### Start all containers stack
```
cd ./poc1-reactjs-liferay-keycloak/runtime/scripts
start-all.sh

```

#### Clean current compose containers, images and volumes
```
cd ./poc1-reactjs-liferay-keycloak/runtime/scripts
clean-all.sh

```

#### Test communication between containers
```
docker exec -it lfroauth-portal sh -c "curl -k -v https://sso.dev.local"
```

## 2. Services Access 

#### URLs 

| Service             | Links   | Description |
| --------            | ------- | -------                                                                                            |
| Portal              | https://portal.dev.local             | Liferay                                                               |
| ReactJS App         | https://app1.dev.local          |                                                                       |
| SSO GUI             | https://sso.dev.local                | Keycloak                                                              |
| SSO Config          | https://sso.dev.local/realms/Liferay/.well-known/openid-configuration | Display SSO configuration            |
| Apim GUI            | http://apim.dev.local:8002           | Kong administration                                                   |
| Cities API          | https://apim.dev.local/cities        | Returned the headers of original request has a response               |
| Debug API           | https://apim.dev.local/debug/get     | Returned all french cities using the public french government API     |
| Traefik  GUI        | https://traefik.dev.local            | Credentials : traefikadmin / traefikadmin                             |
| Mail                | http://localhost:5000                | smtp4dev                                                              |

## 3. Configuration

#### Configure hosts file

Add following lines at the end of the file to properly configure domains
```
127.0.0.1	portal.dev.local
127.0.0.1	sso.dev.local 
127.0.0.1	mail.dev.local
127.0.0.1	apim.dev.local
127.0.0.1	app1.dev.local
127.0.0.1 traefik.dev.local
```

#### Environment configuration

Copy .env-template file to customize installation regarding your environment

1. Liferay license file path configuration
```
cd ./poc1-reactjs-liferay-keycloak/runtime
cp -f ./.env-template ./.env

```

2. Liferay license file path configuration
```
# Path to license file (to customize according to your env)
LFR_LICENSE_FILE_PATH=<UPDATE_WITH_YOUR_PATH>>

```

## 5. Troubleshooting

### 1. Check security exception for self signed certificates

Add security exception for all certificates in your prefered brower
1. From the project root folder  open index.html
![Project Home](./images/home.png "Project home")
2. Open each URL and add certificate exception
![Self Signed Exception](./images/exception.png "Self Signed Exception")

### 2. Check self-signed certificates import in Liferay keystore
Verify that the custom script for importing certificates into the keystore has been executed correctly.

Here is the execution trace without any expected errors.

```
lfroauth-portal   | [LIFERAY] Executing scripts in /mnt/liferay/scripts:
lfroauth-portal   |
lfroauth-portal   | [LIFERAY] Executing certificates-installation.sh.
lfroauth-portal   | Copying the default keystore to a new path
lfroauth-portal   | depth=0 CN = sso.dev.local
lfroauth-portal   | verify error:num=18:self-signed certificate
lfroauth-portal   | verify return:1
lfroauth-portal   | depth=0 CN = sso.dev.local
lfroauth-portal   | verify return:1
lfroauth-portal   | DONE
lfroauth-portal   | Certificate was added to keystore
lfroauth-portal   | Alias name: sso.dev.local
lfroauth-portal   | Creation date: Nov 12, 2024
lfroauth-portal   | Entry type: trustedCertEntry
lfroauth-portal   |
lfroauth-portal   | Owner: CN=sso.dev.local
lfroauth-portal   | Issuer: CN=sso.dev.local
lfroauth-portal   | Serial number: 773b0edc7258e39ff74cfffdb0bc9632e9ac103
lfroauth-portal   | Valid from: Thu Nov 07 16:12:44 GMT 2024 until: Fri Nov 07 16:12:44 GMT 2025
lfroauth-portal   | Certificate fingerprints:
lfroauth-portal   |      SHA1: 7A:AC:D7:80:70:97:51:5A:5B:69:65:F0:C9:65:4B:7D:98:87:50:D9
lfroauth-portal   |      SHA256: A9:49:94:C9:0C:21:00:07:AD:41:64:25:66:F0:B1:4E:A2:94:9F:75:F8:D5:D3:EF:CD:6D:90:D0:C9:50:53:AE
lfroauth-portal   | Signature algorithm name: SHA256withRSA
lfroauth-portal   | Subject Public Key Algorithm: 4096-bit RSA key
lfroauth-portal   | Version: 3
lfroauth-portal   |
lfroauth-portal   | Extensions:
lfroauth-portal   |
lfroauth-portal   | #1: ObjectId: 2.5.29.35 Criticality=false
lfroauth-portal   | AuthorityKeyIdentifier [
lfroauth-portal   | KeyIdentifier [
lfroauth-portal   | 0000: 54 80 39 0F 62 4C 7D A4   30 B3 C4 5B 07 30 43 E9  T.9.bL..0..[.0C.
lfroauth-portal   | 0010: 52 24 12 4B                                        R$.K
lfroauth-portal   | ]
lfroauth-portal   | ]
lfroauth-portal   |
lfroauth-portal   | #2: ObjectId: 2.5.29.19 Criticality=true
lfroauth-portal   | BasicConstraints:[
lfroauth-portal   |   CA:true
lfroauth-portal   |   PathLen: no limit
lfroauth-portal   | ]
lfroauth-portal   |
lfroauth-portal   | #3: ObjectId: 2.5.29.14 Criticality=false
lfroauth-portal   | SubjectKeyIdentifier [
lfroauth-portal   | KeyIdentifier [
lfroauth-portal   | 0000: 54 80 39 0F 62 4C 7D A4   30 B3 C4 5B 07 30 43 E9  T.9.bL..0..[.0C.
lfroauth-portal   | 0010: 52 24 12 4B                                        R$.K
lfroauth-portal   | ]
lfroauth-portal   | ]
lfroauth-portal   |
lfroauth-portal   |
```

### 3. Error copying Liferay license fron start-all.sh 

If you are using WSL, Windows characters may have been written in the .env file, which causes an error when using the ./start-all.sh script.
```
 to Liferay containericense from /home/user1/dev/git/activation-key-dxpdevelopment-7.4-inetum.xml
: no such file or directoryctivation-key-dxpdevelopment-7.4-inetum.xml
```
 If you are in this situation, simply copy the license manually using the provided script.
 ```
./install-licence.sh "<PATH_To_YOUR_LICENSE_FILE>"
```
Sample
```
./install-licence.sh "/mnt/disque1/Soft/_binaries/Liferay/activation-key-dxpdevelopment-7.4-developeractivationkeys2.xml"
```

## 4. References & Documentation

#### For testing
https://github.com/tnishada/keycloak-react-js-example/blob/master/src/App.js
https://developers.onelogin.com/quickstart/authentication/react
https://github.com/onelogin/onelogin-oidc-react/blob/master/src/api/oidcApi.js
https://slash-root.fr/keycloak-installation-avec-docker-et-reverse-proxy-ssl-nginx/
https://stackoverflow.com/questions/51132711/introspection-endpoint-of-keycloak-server

#### OIDC Setup with Traefik examples
https://techblog.smc.it/en/2021-10-15/how-to-connect-keycloak-liferay-openid-connect
https://github.com/smclab/keycloak-openid-connect-liferay/tree/master/config/keycloak/export






