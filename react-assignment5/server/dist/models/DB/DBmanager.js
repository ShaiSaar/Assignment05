"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBgroups_1 = require("./DBgroups");
const DBusers_1 = require("./DBusers");
const DBmessages_1 = require("./DBmessages");
async function init() {
    console.log("DB initialize");
    await DBusers_1.default.getInstance();
    await DBgroups_1.default.getInstance();
    await DBmessages_1.default.getInstance();
    console.log("Done initializing");
}
exports.default = init;
//# sourceMappingURL=DBmanager.js.map