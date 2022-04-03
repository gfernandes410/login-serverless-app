/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-function */
import fs from 'fs'

/* eslint-disable @typescript-eslint/no-var-requires */
jest.setTimeout(30000)

process.env.IS_OFFLINE = 'true'
process.env.AWS_DEFAULT_REGION = 'us-west-2'
process.env.AWS_ACCESS_KEY_ID = 'root'
process.env.AWS_SECRET_ACCESS_KEY = 'root'
process.env.AWS_S3_ACCESS_KEY = ''
process.env.AWS_S3_SECRET_ACCESS_KEY = '/X/'
process.env.REDIS = '127.0.0.1'
process.env.REDIS_PORT = '9379'
process.env.REDIS_AUTH = ''
process.env.REDIS_SERVICE_TIMEOUT = '30'

jest.mock('redis', () => jest.requireActual('redis-mock'))
class MockConfig {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	update() {}
}

jest.mock('aws-sdk', () => {
	const S3Mocked = {
		ManagedUpload: jest.fn(() => ({
			promise: jest.fn().mockReturnThis()
		})),
		GetObjectOutput: jest.fn((data) => ({
			promise: jest.fn(() => data)
		})),
		promise: jest.fn(),
		deleteObject: jest.fn().mockReturnThis(),
		upload: jest.fn().mockImplementation((params: any) => {
			const {
				Key,
				Body,
				Bucket,
				ACL
			} = params

			const fileName = Key.replace('-dev/', '-')

			fs.writeFileSync(`${__dirname}/fixture/${fileName}`, Body)

			return new S3Mocked.ManagedUpload({})
		}),
		getObject: jest.fn().mockImplementation((params, cb) => {
			const fileName = params.Key.replace('-dev/', '-')
			const file = fs.readFileSync(`${__dirname}/fixture/${fileName}`)

			const data = {
				Body: Buffer.from(file)
			}

			if (cb) {
				return cb(null, data)
			}

			return new S3Mocked.GetObjectOutput(data)
		})
	}

	const SQSMocked = {
		sendMessage: jest.fn().mockReturnThis(),
		promise: jest.fn().mockImplementation(() => ({
			MD5OfMessageBody: 'fafb00f5732ab283681e124bf8747ed1',
			MD5OfMessageAttributes: '3ae8f24a165a8cedc005670c81a27295',
			MessageId: '5fea7756-0ea4-451a-a703-a558b933e274'
		}))
	}

	const CloudWatchLogsMocked = {
		describeLogStreams: jest.fn().mockReturnThis(),
		createLogStream: jest.fn().mockReturnThis(),
		putLogEvents: jest.fn().mockReturnThis(),
		promise: jest.fn().mockImplementation(() => ({
			logStreams: [
				{
					uploadSequenceToken: 'mock',
					mock: true
				}
			]
		}))
	}

	const ApiGateway = {
		postToConnection: jest.fn((data) => ({
			promise: jest.fn(() => data)
		}))
	}

	return {
		S3: jest.fn(() => S3Mocked),
		SQS: jest.fn(() => SQSMocked),
		Config: MockConfig,
		CloudWatchLogs: jest.fn(() => CloudWatchLogsMocked),
		ApiGatewayManagementApi: jest.fn(() => ApiGateway)
	}
})
