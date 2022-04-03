import { LAMBDA_LOGS_MAPPER } from '/opt/nodejs/utils/constants'

import {
	APIGatewayProxyEvent as ProxyEvent,
	APIGatewayProxyResult as ProxyResult,
	SQSEvent
} from 'aws-lambda'
import { LogEvent } from '/opt/nodejs/utils/logs'

export class LogsMapper {
	static lambdaEventToLogEvent(name: string, event: ProxyEvent): LogEvent {
        return {
			title: LAMBDA_LOGS_MAPPER.LAMBDA_EVENT_LOG_EVENT(name),
			payload: {
				resource: event.resource,
				endpoint: event.path,
				headers: event.headers,
				queryParams: event.pathParameters || {},
				queryString: event.queryStringParameters || {},
				body: event.body || {},
				requestContext: event.requestContext || {}
			},
			streamName: null,
			groupName: null
        }
    }
}