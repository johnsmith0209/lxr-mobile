class GlobalState {
    constructor() {
        this.state = {};
        this.watchers = [];
    }

    addWatcher(watcher) {
        this.watchers.push(watcher);
    }

    removeWatcher(watcher) {
        this.watchers.splice(this.watchers.indexOf(watcher), 1);
    }

    setSiteNotifications(siteNotifications) {
        this.state.siteNotifications = siteNotifications;
        this.watchers.forEach(watcher => {
            watcher('siteNotifications', siteNotifications);
        });
    }
}

export default new GlobalState();
