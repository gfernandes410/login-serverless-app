/* eslint-disable @typescript-eslint/no-explicit-any */
import AWS, { SQS } from 'aws-sdk'

export class AwsSqsHelper {
	sqs: AWS.SQS

	constructor() {
		if (process.env.IS_OFFLINE) {
			this.sqs = new AWS.SQS({
				accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
				region: process.env.AWS_DEFAULT_REGION || ''
			})
		} else {
			this.sqs = new AWS.SQS({
				httpOptions: {
					timeout: 10000
				}
			})
		}
	}

	async sendMessage (queueParams: SQS.SendMessageRequest): Promise<any> {
		const resultMessage = await this.sqs.sendMessage(queueParams).promise()

		// const resultMessage = 'SALVOU'

		return resultMessage
	}
}
