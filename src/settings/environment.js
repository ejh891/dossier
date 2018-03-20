import * as Environments from 'enums/environments';

class Environment {
    static get env() {
        const url = new URL(window.location);

        if (url.searchParams.get('debugAPI') === 'true') {
            return Environments.LOCAL;
        }

        if (url.hostname === 'localhost') {
            return Environments.DEVELOPMENT;
        }

        return Environments.PRODUCTION;
    }
}

export default Environment;
