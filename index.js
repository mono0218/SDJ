import {Client, GatewayIntentBits} from "discord.js"

export async function Init(token){
    const client = new Client({ intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates,] });

    client.once('ready', async() => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    await client.login(token);

    return client
}

export async function GetGuild(client,GuildId){
    return client.guilds.cache.get(GuildId)
}

export async function Send (client,channelId,content){
    await client.channels.cache.get(channelId).send(content)
}

export async function SendEmbed(client,channelId,Embed){
    await client.channels.cache.get(channelId).send({embeds:[Embed]})
}

export async function Dm(client,userId,content){
    await client.users.cache.get(userId).send(content)
}

export async function Delete(client,userId,message){
    await message.delete()
}

export async function GetFile(message){
    return message.attachments.map(attachment => attachment.url)
}

export async function SendFile(client,channelId,File){
    await client.channels.cache.get(channelId).send({files: [File]})
}

export async function React(message,ReactId){
    await message.react(ReactId)
}

export async function ReactAllDelete(message){
    await message.reactions.removeAll()
}

export async function ReactDelete(message,ReactId){
    await message.reactions.cache.get(ReactId).remove()
}

export async function ChannelCreate(Guild,Option){
    await Guild.channels.create(Option)
}

export async function BanList(Guild){
    const List = await Guild.bans.fetch()
}

export async function Ban(Guild,UserId,Reason=""){
    await Guild.members.ban(UserId,{reason: Reason})
}

export async function UnBan(Guild,UserId,Reason=""){
    await Guild.members.unban(UserId, Reason)
}

export async function Kick(Guild,UserId,Reason=""){
    await Guild.members.kick(UserId,Reason)
}

export async function AddRole(Guild,UserId,RoleId){
    let member = await Guild.members.cache.get(UserId);
    member.roles.add(RoleId)
}

export async function CreateRole(Guild,RoleName){
    await Guild.roles.create({ name: RoleName })
}

export async function CheckRole(Guild,UserId,RoleId){
    let member = await Guild.members.cache.get(UserId);
    member.roles.cache.has(RoleId)
}

export async function GetUserStatus(Guild,UserId){
    let member = await Guild.members.cache.get(UserId);

    return member.presence.status;
}

export async function SetStatusMessage(client,Content,type="WATCHING"){
    client.user.setActivity(Content, { type: type })
}

export async function SetLocalCommands(client,commands,GuildId){
    await client.application.commands.set(commands,GuildId);
}

export async function SetGlobalCommands(client,commands){
    await client.application.commands.set(commands);
}

export async function ListenEvent(client,EventName,func){
    client.on(EventName, func);
}

export async function UnListenEvent(client,EventName,func){
    client.off(EventName,func)
}

