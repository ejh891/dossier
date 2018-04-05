import Hosts from 'settings/hosts';

class PersonService {
  static async browse(options = {}) {
    const {
      apiVersion = 1,
      userId
    } = options;

    const response = await fetch(`${Hosts.dossierDBHost}/api/v${apiVersion}/persons/?userId=${userId}`, { method: 'GET' });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json.data.persons;
  }

  static async read(id, options = {}) {
    const {
      apiVersion = 1
    } = options;

    const response = await fetch(`${Hosts.dossierDBHost}/api/v${apiVersion}/persons/${id}`, { method: 'GET' });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json.data.person;
  }

  static async edit(id, person, options = {}) {
    const {
      apiVersion = 1
    } = options;

    const payload = {
      data: {
        person
      }
    };

    const response = await fetch(`${Hosts.dossierDBHost}/api/v${apiVersion}/persons/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json.data.person;
  }

  static async add(person, options = {}) {
    const {
      apiVersion = 1
    } = options;

    const payload = {
      data: {
        person
      }
    };

    const response = await fetch(`${Hosts.dossierDBHost}/api/v${apiVersion}/persons`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json.data.person;
  }

  static async delete(id, options = {}) {
    const {
      apiVersion = 1
    } = options;

    const response = await fetch(`${Hosts.dossierDBHost}/api/v${apiVersion}/persons/${id}`, { method: 'DELETE' });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json.data.person;
  }
}

export default PersonService;
