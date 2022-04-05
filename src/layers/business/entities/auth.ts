import { IAuth } from '/opt/nodejs/business/contracts/auth'

export class Auth {
    key: string

    secret: string

    constructor(params: IAuth) {
        this.key = params.key
        this.secret = params.secret
    }

}
