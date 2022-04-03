import { CLOUD_WATCH_GROUP, CLOUD_WATCH_STREAM_DEFAULT } from './constants'
import { AwsSqsHelper } from './aws-sqs'

enum LogInfoType {
	INFO = 'INFO',
	WARNING = 'WARNING',
	ERROR = 'ERROR',
	CRITICAL = 'CRITICAL'
}

export interface LogEvent {
	streamName: string | null
	groupName: string | null
	title: string
	payload: any
}

interface LogWithType extends LogEvent {
	type: LogInfoType
}

export class LogsHelper {
    sqs: AwsSqsHelper

	groupName: string

	streamName: string

    constructor(sqs: AwsSqsHelper) {
		this.sqs = sqs

		this.groupName = CLOUD_WATCH_GROUP
		this.streamName = CLOUD_WATCH_STREAM_DEFAULT
    }

    async info(data: LogEvent): Promise<void> {
		const logData: LogWithType = {
			...data,
			type: LogInfoType.INFO,
			groupName: data.groupName || this.groupName,
			streamName: data.streamName || this.streamName
		}

		await this.send(logData)
	}

	async warning(data: LogEvent): Promise<void> {
		const logData: LogWithType = {
			...data,
			type: LogInfoType.WARNING,
			groupName: data.groupName || this.groupName,
			streamName: data.streamName || this.streamName
		}

		await this.send(logData)
	}

	async error(data: LogEvent): Promise<void> {
		const logData: LogWithType = {
			...data,
			type: LogInfoType.ERROR,
			groupName: data.groupName || this.groupName,
			streamName: data.streamName || this.streamName
		}

		await this.send(logData)
	}

	async criticalError(data: LogEvent): Promise<void> {
		const logData: LogWithType = {
			...data,
			type: LogInfoType.CRITICAL,
			groupName: data.groupName || this.groupName,
			streamName: data.streamName || this.streamName
		}

		await this.send(logData)
	}

    private async send(logData): Promise<void> {

		const queueParams = this.buildParamsCloudWatchQueue(logData)

		if (process.env.IS_OFFLINE) {
			console.log(`\n######## Send Message to Log - ${logData.title}`)
			console.log(queueParams.MessageBody, '\n')
		}

		const resultLog = await this.sqs.sendMessage(queueParams)

		if (!resultLog || !resultLog.MessageId) {
            throw new Error()
        }
	}

    private buildParamsCloudWatchQueue(params: LogWithType) {
		const logGroupName = (params.groupName || '').toString()

		const queueParams = {
			MessageBody: JSON.stringify({
				type: params.type,
				title: params.title,
				payload: params.payload
			}),
			QueueUrl: process.env.QUEUE_CLOUD_WATCH_LOG || '',
			MessageAttributes: {
				logGroupName: {
					DataType: 'String',
					StringValue: process.env.IS_OFFLINE ? `${logGroupName}-dev` : logGroupName
				},
				logStreamName: {
					DataType: 'String',
					StringValue: (params.streamName || '').toString()
				},
				timestamp: {
					DataType: 'Number',
					StringValue: new Date().getTime().toString()
				}
			}
		}

		return queueParams
	}

}