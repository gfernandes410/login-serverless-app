import { Auth } from '/opt/nodejs/business/entities/auth'

describe('Auth Entity', () => {
    describe('Constructor', () => {
        it('Create a new entity Auth', () => {
            
            const response = new Auth({
                key: 'key',
                secret: 'secret'
            })
            
            expect(response).toBeDefined()
            expect(response).toBeInstanceOf(Auth)
        })      
    })
})
