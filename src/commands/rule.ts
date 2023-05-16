import { ApplyOptions } from '@sapphire/decorators';
import type { Command } from '@sapphire/framework';
import { Subcommand } from '@sapphire/plugin-subcommands';
import {
    /*ActionRowBuilder,
    ChannelType,*/
    EmbedBuilder,
    //PermissionsBitField,
    type ChatInputCommandInteraction,
} from 'discord.js';
import { Color } from '../lib/embeds';
import * as rulesJSON from '../lib/rules.json';
import { current, seasonsVRC } from '../lib/seasons'

const json = JSON.parse(JSON.stringify(rulesJSON));
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];

enum SubcommandName {
    VRC = 'vrc',
    VIQRC = 'viqrc'
}

const error = (interaction: ChatInputCommandInteraction, content: string) => {
    return interaction.followUp({
        embeds: [new EmbedBuilder().setColor(Color.Red).setTitle(content)],
        ephemeral: true,
    });
};

@ApplyOptions<Subcommand.Options>({
    description: 'Search for any rule within any VRC or VIQRC game manual',
    subcommands: [
        {
            name: SubcommandName.VRC,
            chatInputRun: async (interaction: ChatInputCommandInteraction) => {
                await interaction.deferReply({});

                const ruleNumber = interaction.options.getString(
                    ruleOption.ruleNumber,
                    true
                );

                let seasonID = interaction.options.getString(
                    ruleOption.seasonName,
                    false
                );
                if (seasonID === null) {
                    seasonID = current.VRC;
                }

                let season = seasonID;
                let seasonName = seasonsVRC[season as keyof typeof seasonsVRC];
                let ruleMain;
                let subsections: string[] = [];
                let subsectionsContent = ' ';

                try {
                    ruleMain = json[season][ruleNumber]['main']
                } catch {
                    await error(
                        interaction,
                        `There is no rule ${ruleNumber} for ${seasonName}`
                    );
                }

                let jsonLength = Object.keys(json[season][ruleNumber]).length
                if (jsonLength !== 1) {
                    subsectionsContent = '';
                    try {
                        for (var i = 0; i < jsonLength; i++) {
                            if (i == 0) {
                                if (json[season][ruleNumber]['note'] !== undefined) {
                                    jsonLength -= 1;
                                }
                                continue;
                            }
                            try {
                                subsections.push(json[season][ruleNumber][alphabet[i - 1]])
                                subsectionsContent += `**${alphabet[i - 1]}.** ${json[season][ruleNumber][alphabet[i - 1]]}\n\n`;
                            } catch (error) {
                                console.log(error);
                                throw error;
                            }
                        }
                        if (json[season][ruleNumber]['note'] !== undefined) {
                            subsectionsContent += `Note: ${json[season][ruleNumber]['note']}\n\n`;
                        }
                    } catch (error) {
                        console.log(error)
                        throw error;
                    }
                }

                await interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(Color.Red)
                            .setTitle(`${seasonName} Rule ${ruleNumber}`)
                            .setDescription(ruleMain)
                            .addFields({ name: ' ', value: subsectionsContent }
                            )
                    ],
                    ephemeral: true,
                });
            }
        }
    ],
})
export class RuleCommand extends Subcommand {
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
                                    .setName(ruleOption.ruleNumber)
                                    .setDescription('The rule you are searching for')
                                    .setRequired(true)
                            )
                            .addStringOption(season =>
                                season
                                    .setName(ruleOption.seasonName)
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

enum ruleOption {
    ruleNumber = 'rule',
    seasonName = 'season'
}