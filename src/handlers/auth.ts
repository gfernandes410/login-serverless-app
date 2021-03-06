import {
	APIGatewayProxyEvent as ProxyEvent,
	APIGatewayProxyResult as ProxyResult
} from 'aws-lambda'
import { AwsSqsHelper } from '/opt/nodejs/utils/aws-sqs'
import { LogsHelper } from '/opt/nodejs/utils/logs'
import { LogsMapper } from '/opt/nodejs/business/mappers/logs'
import { LAMBDA_LOG_EVENT } from '/opt/nodejs/utils/constants'
import { EventHandlerMapper } from '/opt/nodejs/business/mappers/event-handler'

export const handler = async (event: ProxyEvent): Promise<ProxyResult> => {
	
    const awsSqsHelper = new AwsSqsHelper()

    const logs = new LogsHelper(awsSqsHelper)

	const result: ProxyResult = {
		body: 'OK',
		statusCode: 200
	}	

    try {
        await logs.info(LogsMapper.lambdaEventToLogEvent(LAMBDA_LOG_EVENT.AUTH, event))

        const auth = EventHandlerMapper.httpAuthToReadBody(event)

        result.body = auth
    } catch (error) {
        throw error
    }
  
	return result

}
