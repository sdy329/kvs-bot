import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptionsRunTypeEnum } from '@sapphire/framework';
import {
    EmbedBuilder,
    PermissionsBitField,
    type ChatInputCommandInteraction,
} from 'discord.js';
import { Color } from '../lib/embeds';

const error = (interaction: ChatInputCommandInteraction, content: string) => {
    return interaction.followUp({
        embeds: [new EmbedBuilder().setColor(Color.Red).setDescription(content)],
        ephemeral: false,
    });
};

@ApplyOptions<Command.Options>({
    description: 'Changes specific characters in nicknames',
    requiredUserPermissions: [PermissionsBitField.Flags.ManageNicknames],
    runIn: [CommandOptionsRunTypeEnum.GuildAny]
})
export class UpdateNicknameCommand extends Command {
    public override async chatInputRun(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ ephemeral: false });

        if (!interaction.inGuild()) {
            await error(interaction, 'Command only available in servers');
            return;
        }

        const guild = await interaction.client.guilds.fetch(
            interaction.guildId
        );
        if (!guild.members.me) {
            await error(interaction, 'I am not a member of this server');
            return;
        }

        const missingPermissions = guild.members.me.permissions.missing([
            PermissionsBitField.Flags.ManageNicknames,
        ]);
        if (missingPermissions.length) {
            await error(
                interaction,
                `I am missing the following permissions: ${missingPermissions}`
            );
            return;
        }

        const userFind = interaction.options.getString(
            changeOption.find,
            true
        )

        const userReplace = interaction.options.getString(
            changeOption.replace,
            true
        )

        const members = await guild.members.fetch();
        let changeCount = 0;
        let errorCount = 0;

        await Promise.all(
            members.map(async (member) => {
                if (member.displayName.includes(userFind)) {
                    try {
                        await member.setNickname(
                            member.displayName.replace(userFind, userReplace)
                        );
                        console.log(`Changed nickname for ${member.user.tag}: ${member.displayName}`);
                        changeCount++;
                    } catch (error) {
                        console.error(`Failed to change nickname for ${member.user.tag}`);
                        errorCount++;
                    }
                }
            })
        );

        await interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setColor(Color.Green)
                    .setDescription(
                        [
                            'Command Complete ✅',
                            `┣ Changed usernames: ${changeCount}`,
                            `┗ Change errors: ${errorCount}`
                        ].join('\n')
                    ),
            ],
        });
    }
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand(
            command =>
                command
                    .setName(this.name)
                    .setDescription(this.description)
                    .addStringOption(find =>
                        find
                            .setName(changeOption.find)
                            .setDescription(
                                'The string we are looking for'
                            )
                            .setRequired(true)
                    )
                    .addStringOption(replace =>
                        replace
                            .setName(changeOption.replace)
                            .setDescription(
                                'The string we are replacing with'
                            )
                            .setRequired(true)
                    )
            //  {idHints: ['983911170203324447']}
        );
    }
}

enum changeOption {
    find = 'find',
    replace = 'replace',
}