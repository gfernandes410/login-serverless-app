import { AwsSqsHelper } from '/opt/nodejs/utils/aws-sqs'
import { LogsHelper, LogEvent } from '/opt/nodejs/utils/logs'

describe('Logs Helper', () => {

    let logsHelper: LogsHelper

    beforeEach(() => {
        const awsSqsHelper = new AwsSqsHelper()

        logsHelper = new LogsHelper(awsSqsHelper)
    })

    it('Send Info Log', async () => {

        const msg  = {
            streamName: null,
            groupName: null,
            title: 'Title',
            payload: 'Payload'
        }

        const response = await logsHelper.info(msg)

        expect(response).toBeUndefined()
    })

    it('Send Warning Log', async () => {

        const msg  = {
            streamName: null,
            groupName: null,
            title: 'Title',
            payload: 'Payload'
        }

        const response = await logsHelper.warning(msg)

        expect(response).toBeUndefined()
    })

    it('Send Error Log', async () => {

        const msg  = {
            streamName: null,
            groupName: null,
            title: 'Title',
            payload: 'Payload'
        }

        const response = await logsHelper.error(msg)

        expect(response).toBeUndefined()
    })

    it('Send Critical Error Log', async () => {

        const msg  = {
            streamName: null,
            groupName: null,
            title: 'Title',
            payload: 'Payload'
        }

        const response = await logsHelper.criticalError(msg)

        expect(response).toBeUndefined()
    })

    it('Send Info Log with payload', async () => {

        const msg  = {
            streamName: null,
            groupName: null,
            title: 'Title',
            payload: {
                'test': 'using an object'
            }
        }

        const response = await logsHelper.info(msg)

        expect(response).toBeUndefined()
    })

    it('Send Info Log with payload and stream', async () => {

        const msg  = {
            streamName: 'Stream',
            groupName: 'Group',
            title: 'Title',
            payload: {
                'test': 'using an object'
            }
        }

        const response = await logsHelper.info(msg)

        expect(response).toBeUndefined()
    })

})