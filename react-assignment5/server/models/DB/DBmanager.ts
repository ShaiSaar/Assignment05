import DBgroups from './DBgroups'
import DBusers from './DBusers'
import DBmessages from './DBmessages'
import DataStore from "../../../src/DataStore/DataStore";

export default async function init(){
    console.log("DB initialize")
    await DBusers.getInstance()
    await DBgroups.getInstance()
    await DBmessages.getInstance()
    console.log("Done initializing")
}