import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
/*
import { Subcommand } from '@sapphire/plugin-subcommands';
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    EmbedBuilder,
    PermissionsBitField,
    type ChatInputCommandInteraction,
} from 'discord.js';
import { Color } from '../lib/embeds';*/

enum SubcommandName {
    VRC = 'vrc',
    VIQRC = 'viqrc'
}
/*
const error = (interaction: ChatInputCommandInteraction, content: string) => {
    return interaction.followUp({
        embeds: [new EmbedBuilder().setColor(Color.Red).setDescription(content)],
        ephemeral: true,
    });
};
*/
@ApplyOptions<Command.Options>({ description: 'Search for any rule within any VRC or VIQRC game manual', })
export class RuleCommand extends Command {
    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand(
            command =>
                command
                    .setName(this.name)
                    .setDescription(this.description)
                    .addSubcommand(vrc =>
                        vrc
                            .setName(SubcommandName.VRC)
                            .setDescription('Search for any rule within any VRC game manual')
                            .addStringOption(ruleNumber =>
                                ruleNumber
                                    .setName('rule')
                                    .setDescription('The rule you are searching for')
                                    .setRequired(true)
                            )
                            .addStringOption(season =>
                                season
                                    .setName('season')
                                    .setDescription(
                                        'The season the rule is for. Leave blank for current'
                                    )
                                    .setChoices(
                                        { name: 'Over Under', value: 'VRC_OU' },
                                        { name: 'Spin Up', value: 'VRC_SU' },
                                        { name: 'Tipping Point', value: 'VRC_TiP' },
                                        { name: 'Change Up', value: 'VRC_CU' },
                                        { name: 'Tower Takeover', value: 'VRC_TT' },
                                        { name: 'Turning Point', value: 'VRC_TP' },
                                        { name: 'In The Zone', value: 'VRC_ITZ' },
                                        { name: 'Starstruck', value: 'VRC_SS' },
                                        { name: 'Nothing But Net', value: 'VRC_NBN' },
                                        { name: 'Skyrise', value: 'VRC_SR' },
                                        { name: 'Toss Up', value: 'VRC_TU' },
                                        { name: 'Sack Attack', value: 'VRC_SA' },
                                        { name: 'Gateway', value: 'VRC_GW' },
                                        { name: 'Round Up', value: 'VRC_RU' },
                                        { name: 'Clean Sweep', value: 'VRC_CS' },
                                        { name: 'Elevation', value: 'VRC_EL' },
                                        { name: 'Bridge Battle', value: 'VRC_BB' }
                                    )
                                    .setRequired(false)
                            )
                    )
                    .addSubcommand(vrc =>
                        vrc
                            .setName(SubcommandName.VIQRC)
                            .setDescription('Search for any rule within any VIQRC game manual')
                            .addStringOption(ruleNumber =>
                                ruleNumber
                                    .setName('rule')
                                    .setDescription('The rule you are searching for')
                                    .setRequired(true)
                            )
                            .addStringOption(season =>
                                season
                                    .setName('season')
                                    .setDescription(
                                        'The season the rule is for. Leave blank for current'
                                    )
                                    .setChoices(
                                        { name: 'Full Volume', value: 'VIQRC_FV' },
                                        { name: 'Slapshot', value: 'VIQRC_SS' },
                                        { name: 'Pitching In', value: 'VIQRC_PI' },
                                        { name: 'Rise Above', value: 'VIQRC_RA' },
                                        { name: 'Squared Away', value: 'VIQRC_SA' },
                                        { name: 'Next Level', value: 'VIQRC_NL' },
                                        { name: 'Ringmaster', value: 'VIQRC_RM' },
                                        { name: 'Crossover', value: 'VIQRC_CO' },
                                        { name: 'Bank Shot', value: 'VIQRC_BS' },
                                        { name: 'Highrise', value: 'VIQRC_HR' },
                                        { name: 'Add it Up', value: 'VIQRC_AU' },
                                        { name: 'Rings-n-Things', value: 'VIQRC_RT' }
                                    )
                                    .setRequired(false)
                            )
                    ),
            //{ idHints: ['988533666722488380', '985249852550168646'] }
        );
    }
}