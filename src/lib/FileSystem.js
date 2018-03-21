import Directory from 'lib/Directory';

class FileSystem {
    constructor() {
        this.root = new Directory('/');
    }

    insert(item, path) {
        const root = this.getTree(path);

        root.files.push(item);
    }

    getTree(path) {
        const directoryNames = path.split('/').filter(directoryName => directoryName !== '');

        // traverse to the correct folder creating new folders along the way if necessary
        let currentDirectory = this.root;
        for (const directoryName of directoryNames) {
            if (!currentDirectory.containsSubDirectory(directoryName)) {
                currentDirectory.addDirectory(directoryName);
            }

            currentDirectory = currentDirectory.directories.find(directory => directory.name === directoryName);
        }

        return currentDirectory;
    }
}

export default FileSystem;
