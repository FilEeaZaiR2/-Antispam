const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "!as";

client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log("Connexion en cours ...");
});

client.on(`message`, message =>{
    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("You don't the right to do this");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send("You have to ping someone to execute this command");
        }
    
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("I didn't find the user or he doesn't exist");
        }
    
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("I don't the right to do this");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} has been muted by ${message.author.username} !`);
        })
        message.delete()
    }
    
    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("You don't the right to do this");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send("You have to ping someone to execute this command");
        }
    
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("I didn't find the user or he doesn't exist");
        }
    
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("I don't the right to do this");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} has been unmuted by ${message.author.username} !`);
        })
        message.delete()
    }
    if(message.content.startsWith(prefix + "allmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("You don't the right to do this");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send("You have to ping someone to execute this command");
        }
    
        let membre = message.guild.member(message.mentions.users.first());
        if(!membre) {
            return message.channel.send("I didn't find the user or he doesn't exist");
        }
    
        let mute = message.guild.roles.find("name", "muted");
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("I don't the right to do this");
        
        else{
            membre.addRole(mute)
            message.channel.send(`${membre.user.username} has been muted by ${message.author.username} !`);
        }
        message.delete()
    }

    if(message.content.startsWith(prefix + "allunmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("You don't the right to do this");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send("You have to ping someone to execute this command");
        }
    
        let membre = message.guild.member(message.mentions.users.first());
        if(!membre) {
            return message.channel.send("I didn't find the user or he doesn't exist");
        }
    
        let mute = message.guild.roles.find("name", "muted");
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("I don't the right to do this");
        
        else{
            membre.removeRole(mute)
            message.channel.send(`${membre.user.username} has been unmuted by ${message.author.username} !`);
        }
        message.delete()
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.ID === ":logoLoL:543144782810316830") {
        if(reaction.message.channel.id === "363784426506682369") {
            user.send("**Vous avez accepté le réglement !**")
            const giveRole = reaction.message.guild.roles.find(r => r.id === "543150172985622559");
            reaction.message.guild.member(user).addRole(giveRole);
        };
    };
});
