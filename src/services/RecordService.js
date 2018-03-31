import Hosts from 'settings/hosts';

class RecordService {
  static async browse(options = {}) {
    const {
      apiVersion = 1
    } = options;

    const response = await fetch(`${Hosts.dossierDBHost}/api/v${apiVersion}/records`, { method: 'GET' });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json.data.records;
  }

  // read

  // edit

  static async add(record, options = {}) {
    const {
      apiVersion = 1
    } = options;

    const payload = {
      data: {
        record
      }
    };

    const response = await fetch(`${Hosts.dossierDBHost}/api/v${apiVersion}/records`, {
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

    return json.data.record;
  }

  static async edit(id, record, options = {}) {
    const {
      apiVersion = 1
    } = options;

    const payload = {
      data: {
        record
      }
    };

    const response = await fetch(`${Hosts.dossierDBHost}/api/v${apiVersion}/records/${id}`, {
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

    return json.data.record;
  }

  static async delete(id, options = {}) {
    const {
      apiVersion = 1
    } = options;

    const response = await fetch(`${Hosts.dossierDBHost}/api/v${apiVersion}/records/${id}`, { method: 'DELETE' });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json);
    }

    return json.data.record;
  }
}

export default RecordService;
