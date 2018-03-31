import Environment from 'settings/environment';
import * as Environments from 'enums/environments';

class Hosts {
  static get dossierDBHost() {
    switch (Environment.env) {
      case Environments.LOCAL:
        return 'https://localhost:3001';
      case Environments.DEVELOPMENT:
        return 'https://dossierdb-test.herokuapp.com';
      case Environments.PRODUCTION:
        return 'https://dossierdb.herokuapp.com';
      default:
        throw new Error(`Unrecognized Environment: ${Environment.env}. Check Environments enum.`)
    }
  }

  static get googleCloudStorageBucket() {
    switch (Environment.env) {
      case Environments.LOCAL:
      case Environments.DEVELOPMENT:
        return 'gs://dossier-uploads-test';
      case Environments.PRODUCTION:
        return 'gs://dossier-uploads';
      default:
        throw new Error(`Unrecognized Environment: ${Environment.env}. Check Environments enum.`)
    }
  }
}

export default Hosts;
