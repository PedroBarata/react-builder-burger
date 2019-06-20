import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should get the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should save on state (store) the auth infos', () => {
        expect(reducer({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, actionTypes.AUTH_SUCCESS)).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

   /*  it('should logout the user', () => {
        expect(reducer({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
        }, actionTypes.AUTH_LOGOUT)).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
        });
    }); */

});