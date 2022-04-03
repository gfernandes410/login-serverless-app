export const CLOUD_WATCH_GROUP = 'login-app'

export const CLOUD_WATCH_STREAM_DEFAULT = 'genericLogin'

export const LAMBDA_LOGS_MAPPER = {
	LAMBDA_EVENT_LOG_EVENT: (name: string): string => `(lambda ${name}) Evento HTTP recebido`,
}

export const LAMBDA_LOG_EVENT = {
	AUTH: 'auth'
}
