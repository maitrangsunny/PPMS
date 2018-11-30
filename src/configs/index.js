'use strict';
const ENV = 'dev';

class Configs {
    static _instance;

    static get Instance() {
        if (!Configs._instance) {
            Configs._instance = new this();
        }
        return Configs._instance;
    }

    get env() {
        return ENV;
    }

    load(name) {
        if (!this[name]) {
            let defaultConfig = {};
            let envConfig = {};
            try {
                defaultConfig = require('./' + name + ".json");
                envConfig = require("./" + ENV + "/" + name + ".json");
            } catch (error) {
                //
            }
            this[name] = Object.assign(defaultConfig, envConfig);
        }
    }
}

export default Configs.Instance;