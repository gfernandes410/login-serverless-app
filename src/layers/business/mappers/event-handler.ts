import { APIGatewayProxyEvent} from 'aws-lambda'
import { IAuth } from '/opt/nodejs/business/contracts/auth'
import { Auth } from '/opt/nodejs/business/entities/auth'

export class EventHandlerMapper {

    static httpAuthToReadBody(event: APIGatewayProxyEvent): any {
        const body = event.body ? JSON.parse(event.body) : {}

        let auth = body as IAuth

        auth = new Auth(auth)

        return auth
    }

}