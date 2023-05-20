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
        console.error(error)
    }
}

export async function GetChannel(client,ChannelId){
    try {
        return client.channels.fetch(ChannelId)
    } catch (error) {
        console.error(error)
    }
}

export async function Send (client,Channel,content){
    try {
        await Channel.send(content)
    } catch (error) {
        console.error(error)
    }
}

export async function SendEmbed(client,Channel,Embed){
    try {
        Channel.send({embeds:[Embed]});
    } catch (error) {
        console.error(error)
    }
}

export async function Dm(client,userId,content){
    try {
        const user =await client.users.fetch(userId)
        user.send(content)
    } catch (error) {
        console.error(error)
    }
}

export async function Delete(client,Channel,MessageId){
    try {
        Channel.messages.delete(MessageId);
    } catch (error) {
        console.error(error)
    }
}

export async function GetFile(Channel,MessageId){
    try {
        const message = await Channel.messages.fetch(MessageId)
        return message.attachments.map(attachment => attachment.url)
    } catch (error) {
        console.error(error)
    }
}

export async function SendFile(client,Channel,File){
    try {
        await Channel.send({files: [File]})
    } catch (error) {
        console.error(error)
    }

}

export async function React(Channel,MessageId,ReactId){
    try {
        const message = await Channel.messages.fetch(MessageId)
        await message.react(ReactId)
    } catch (error) {
        console.error(error)
    }
}

export async function ReactAllDelete(Channel,MessageId){
    try {
        const message = await Channel.messages.fetch(MessageId)
        await message.reactions.removeAll()
    } catch (error) {
        console.error(error)
    }
}

export async function ReactDelete(Channel,MessageId,ReactId){
    try {
        const message = await Channel.messages.fetch(MessageId)
        const data = await message.reactions.fetch(ReactId)
        data.remove()
    } catch (error) {
        console.error(error)
    }
}

export async function ChannelCreate(Guild,Option){
    try {
        await Guild.channels.create(Option)
    } catch (error) {
        console.error(error)
    }
}

export async function BanList(Guild){
    try {
        const List = await Guild.bans.fetch()
    } catch (error) {
        console.error(error)
    }
}

export async function Ban(Guild,UserId,Reason=""){
    try {
        await Guild.members.ban(UserId,{reason: Reason})
    } catch (error) {
        console.error(error)
    }
}

export async function UnBan(Guild,UserId,Reason=""){
    try {
        await Guild.members.unban(UserId, Reason)
    } catch (error) {
        console.error(error)
    }
}

export async function Kick(Guild,UserId,Reason=""){
    try {
        await Guild.members.kick(UserId,Reason)
    } catch (error) {
        console.error(error)
    }
}

export async function AddRole(Guild,UserId,RoleId){
    try {
        let member = await Guild.members.fetch(UserId);
        await member.roles.add(RoleId)
    } catch (error) {
        console.error(error)
    }
}

export async function CreateRole(Guild,RoleName){
    try {
        await Guild.roles.create({ name: RoleName })
    } catch (error) {
        console.error(error)
    }
}

export async function CheckRole(Guild,UserId,RoleId){
    try {
        let member = await Guild.members.fetch(UserId);
        member.roles.cache.has(RoleId)
    } catch (error) {
        console.error(error)
    }
}

export async function GetUserStatus(Guild,UserId){
    try {
        let member = await Guild.members.fetch(UserId);

        return member.presence.status;
    } catch (error) {
        console.error(error)
    }
}

export async function SetStatusMessage(client,Content,type="WATCHING"){
    try {
        client.user.setActivity(Content, { type: type })
    } catch (error) {
        console.error(error)
    }
}

export async function SetLocalCommands(client,commands,GuildId){
    try {
        await client.application.commands.set(commands,GuildId);
    } catch (error) {
        console.error(error)
    }
}

export async function SetGlobalCommands(client,commands){
    try {
        await client.application.commands.set(commands);
    } catch (error) {
        console.error(error)
    }
}

export async function ListenOnEvent(client,EventName,func){
    try {
        client.on(EventName, func);
    } catch (error) {
        console.error(error)
    }
}

export async function ListenOffEvent(client,EventName,func){
    try {
        client.off(EventName,func)
    } catch (error) {
        console.error(error)
    }
}

export async function Reply(interaction,Content){
    try {
        await interaction.reply(Content)
    } catch (error) {
        console.error(error)
    }
}