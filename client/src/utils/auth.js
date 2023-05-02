import decode from 'jwt-decode';

class AuthService {
    
    getProfile() {
        return decode(this.getToken);
    }

    isTokenExpired(token) {
        // Decode the token to get its expiration time that was set by the server
        const decoded = decode(token);
        // If the expiration time is less than then current time (in seconds), the token is expired and we return true.
        if(decoded.exp < Date.now() / 1000) {
            localStorage.remoteItem('id_token');
            return true;
        } else {
            return false;
        }
    }

    loggedIn() {
        const token = this.getToken();
        // If there is a token, and its not expired, return 'true';
        return token && !this.isTokenExpired(token) ? true : false;
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.reload();
    }
}

export default new AuthService();