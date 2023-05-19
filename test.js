import {Init, Delete, GetGuild, GetChannel, ListenOnEvent} from "./index.js"
const TOKEN = ""
const client = await Init(TOKEN)

async function App(){
    await ListenOnEvent(client,'messageCreate',func)
}

const func = async function func(msg){
    await Delete(client,await GetChannel(client,msg.channelId),msg.id)
}

App()
