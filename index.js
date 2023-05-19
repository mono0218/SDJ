import {Client, GatewayIntentBits} from "discord.js"

export async function Init(token){
    const client = new Client({ intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates,] });

    client.once('ready', async() => {
        await console.log(`Logged in as ${client.user.tag}!`);
    });

    await client.login(token);

    return client;
}

export async function GetGuild(client,GuildId){
    try {
        return client.guilds.fetch(GuildId)
    } catch (error) {
        console.log(error)
    }
}

export async function GetChannel(client,ChannelId){
    try {
        return client.channels.fetch(ChannelId)
    } catch (error) {
        console.log(error)
    }
}

export async function Send (client,Channel,content){
    try {
        await Channel.send(content)
    } catch (error) {
        console.log(error)
    }
}

export async function SendEmbed(client,Channel,Embed){
    try {
        Channel.send({embeds:[Embed]});
    } catch (error) {
        console.log(error)
    }
}

export async function Dm(client,userId,content){
    try {
        const user =await client.users.fetch(userId)
        user.send(content)
    } catch (error) {
        console.log(error)
    }
}

export async function Delete(client,Channel,MessageId){
    try {
        Channel.messages.delete(MessageId);
    } catch (error) {
        console.log(error)
    }
}

export async function GetFile(Channel,MessageId){
    try {
        const message = await Channel.messages.fetch(MessageId)
        return message.attachments.map(attachment => attachment.url)
    } catch (error) {
        console.log(error)
    }
}

export async function SendFile(client,Channel,File){
    try {
        await Channel.send({files: [File]})
    } catch (error) {
        console.log(error)
    }
}

export async function React(Channel,MessageId,ReactId){
    const message = await Channel.messages.fetch(MessageId)
    await message.react(ReactId)
}

export async function ReactAllDelete(Channel,MessageId){
    const message = await Channel.messages.fetch(MessageId)
    await message.reactions.removeAll()
}

export async function ReactDelete(Channel,MessageId,ReactId){
    const message = await Channel.messages.fetch(MessageId)
    const data = await message.reactions.fetch(ReactId)
        data.remove()
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
    let member = await Guild.members.fetch(UserId);
    await member.roles.add(RoleId)
}

export async function CreateRole(Guild,RoleName){
    await Guild.roles.create({ name: RoleName })
}

export async function CheckRole(Guild,UserId,RoleId){
    let member = await Guild.members.fetch(UserId);
    member.roles.cache.has(RoleId)
}

export async function GetUserStatus(Guild,UserId){
    let member = await Guild.members.fetch(UserId);

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

export async function ListenOnEvent(client,EventName,func){
    client.on(EventName, func);
}

export async function ListenOffEvent(client,EventName,func){
    client.off(EventName,func)
}

export async function Reply(interaction,Content){
    await interaction.reply(Content)
}

