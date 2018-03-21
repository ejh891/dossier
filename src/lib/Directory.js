class Directory {
    constructor(name, parentDirectory = null) {
        this.name = name;
        this.parentDirectory = parentDirectory;
        this.files = [];
        this.directories = [];
    }

    /**
     * @returns {String} the full path starting and ending with /
     */
    getFullPath() {
        let path = '';

        let currentDirectory = this;
        while(currentDirectory.parentDirectory !== null) {
            path = currentDirectory.name + '/' + path;

            currentDirectory = currentDirectory.parentDirectory;;
        }

        return '/' + path;
    }

    addFile(file) {
        this.files.push(file);
    }

    addDirectory(name) {
        if (this.containsSubDirectory(name)) {
            throw new Error(`Attempted to add a directory that already exists. Directory: ${name}`);
        }

        this.directories.push(new Directory(name, this));
    }

    containsSubDirectory(name) {
        return this.directories.some(directory => directory.name === name);
    }
}

export default Directory;
