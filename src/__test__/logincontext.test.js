

const user = require('../context/AuthContext');
const handleSignup = require('../context/AuthContext');
const handleLogin = require('../context/AuthContext');


describe('AuthContext', () => {
    it('should be defined', () => {
        expect(user).toBeDefined();
    });

    it('should be an object', () => {
        expect(typeof user).toBe('object');
    });

    it('should have a property called handleSignup', () => {
        expect(handleSignup).toBeDefined();
    });

    it('should have a property called handleLogin', () => {
        expect(handleLogin).toBeDefined();
    })


});


