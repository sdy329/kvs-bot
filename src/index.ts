import {SapphireClient} from '@sapphire/framework';
import '@sapphire/plugin-logger/register';
import {GatewayIntentBits, Partials} from 'discord.js';
import {MongoClient} from 'mongodb';
import {logLevel, mongoUrl} from './lib/config';
import {SettingsManager, type GuildSettings} from './lib/settings';
import type {VerifiedMember} from './lib/verification';

const mongoClient = new MongoClient(mongoUrl);
const database = mongoClient.db();

const guildSettings = database.collection<GuildSettings>('settings');
export const verifiedMembers = database.collection<VerifiedMember>('members');

export const settingsManager = new SettingsManager(guildSettings);

const discordClient = new SapphireClient({
  shards: 'auto',
  partials: [Partials.GuildMember, Partials.Message],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  logger: {level: logLevel}
});

const main = async () => {
  try {
    discordClient.logger.info('Connecting to database');
    await mongoClient.connect();
    discordClient.logger.info('Connected to database');

    discordClient.logger.info('Logging in to Discord');
    await discordClient.login();
    discordClient.logger.info('Logged in to Discord');
  } catch (error) {
    discordClient.logger.fatal(error);
    throw error;
  }
};

process.on('SIGTERM', async () => {
  discordClient.destroy();
  await mongoClient.close();
});

main();
