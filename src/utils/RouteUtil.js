class RouteUtil {
    static trimPath(path) {
        if (path.startsWith('/')) {
            path = path.slice(1);
        }

        if (path.endsWith('/')) {
            path = path.slice(0, -1);
        }

        return path;
    }

    static getRecordRoute(personId, path, recordId = '') {
        path = RouteUtil.trimPath(path);

        return `/persons/${personId}/records/${path}/${recordId}`;
    }

    static getNewRecordRoute(personId) {
        return `/persons/${personId}/newRecord`;
    }

    static getEditRecordRoute(personId, recordId) {
        return `/persons/${personId}/editRecord/${recordId}`;
    }

    static getEditPersonRoute(personId) {
        return `/persons/editPerson/${personId}`;
    }
}

export default RouteUtil;
