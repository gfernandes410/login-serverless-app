import {
	APIGatewayProxyEvent as ProxyEvent,
	APIGatewayProxyResult as ProxyResult
} from 'aws-lambda'

export const handler = async (event: ProxyEvent): Promise<ProxyResult> => {
	
	const result: ProxyResult = {
		body: 'OK',
		statusCode: 200
	}	


	return result

}
