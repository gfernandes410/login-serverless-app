import { APIGatewayProxyEvent} from 'aws-lambda'
import { EventHandlerMapper } from '/opt/nodejs/business/mappers/event-handler'

describe('Event Handler Mapper', () => {
    describe('EventHandlerMapper', () => {

        it('New handler', () => {

            const event: APIGatewayProxyEvent = {
                "body":"{\"key\":\"523ec55c02b999aa0fd7208d8f5497e1715f207e\",   \"secret\":\"1e6c213cd22c7d20b9752f57e5d4681d\"}",
                "headers":{
                   "Content-Type":"application/json",
                   "User-Agent":"PostmanRuntime/7.26.8",
                   "Accept":"*/*",
                   "Cache-Control":"no-cache",
                   "Postman-Token":"3b7ffab1-f49c-48c3-b265-28e0666a0c70",
                   "Host":"0.0.0.0:5000",
                   "Accept-Encoding":"gzip, deflate, br",
                   "Connection":"keep-alive",
                   "Content-Length":"27"
                },
                "httpMethod":"POST",
                "isBase64Encoded":false,
                "multiValueHeaders":{
                   "Content-Type":[
                      "application/json"
                   ],
                   "User-Agent":[
                      "PostmanRuntime/7.26.8"
                   ],
                   "Accept":[
                      "*/*"
                   ],
                   "Cache-Control":[
                      "no-cache"
                   ],
                   "Postman-Token":[
                      "3b7ffab1-f49c-48c3-b265-28e0666a0c70"
                   ],
                   "Host":[
                      "0.0.0.0:5000"
                   ],
                   "Accept-Encoding":[
                      "gzip, deflate, br"
                   ],
                   "Connection":[
                      "keep-alive"
                   ],
                   "Content-Length":[
                      "27"
                   ]
                },
                "multiValueQueryStringParameters":null,
                "path":"/app",
                "pathParameters":null,
                "queryStringParameters":null,
                "requestContext":{
                   "accountId":"offlineContext_accountId",
                   "apiId":"offlineContext_apiId",
                   "authorizer":{
                      "claims":"undefined",
                      "scopes":"undefined",
                      "principalId":"offlineContext_authorizer_principalId"
                   },
                   "domainName":"offlineContext_domainName",
                   "domainPrefix":"offlineContext_domainPrefix",
                   "extendedRequestId":"cl1lgozs000009xpg1hwa5mqg",
                   "httpMethod":"POST",
                   "identity":{
                       "clientCert": null,
                      "accessKey":null,
                      "accountId":"offlineContext_accountId",
                      "apiKey":"offlineContext_apiKey",
                      "apiKeyId":"offlineContext_apiKeyId",
                      "caller":"offlineContext_caller",
                      "cognitoAuthenticationProvider":"offlineContext_cognitoAuthenticationProvider",
                      "cognitoAuthenticationType":"offlineContext_cognitoAuthenticationType",
                      "cognitoIdentityId":"offlineContext_cognitoIdentityId",
                      "cognitoIdentityPoolId":"offlineContext_cognitoIdentityPoolId",
                      "principalOrgId":null,
                      "sourceIp":"192.168.0.1",
                      "user":"offlineContext_user",
                      "userAgent":"PostmanRuntime/7.26.8",
                      "userArn":"offlineContext_userArn"
                   },
                   "path":"/app",
                   "protocol":"HTTP/1.1",
                   "requestId":"cl1lgozs000019xpg9gcc82z5",
                   "requestTime":"05/Apr/2022:01:27:38 +0000",
                   "requestTimeEpoch":1649122058002,
                   "resourceId":"offlineContext_resourceId",
                   "resourcePath":"/app",
                   "stage":"dev"
                },
                "resource":"/app",
                "stageVariables": null
             }
                
            const response = EventHandlerMapper.httpAuthToReadBody(event)

            expect(response).toEqual(
                {
                    key: '523ec55c02b999aa0fd7208d8f5497e1715f207e',
                    secret: '1e6c213cd22c7d20b9752f57e5d4681d'
                }
            )
        })
    })
})
