const Env = use('Env');

module.exports = {
  ally: {
    discord: {
      scope: ['identify', 'guilds'],
      clientId: Env.get('DISCORD_CLIENT_ID'),
      redirectUri: Env.get('DISCORD_REDIRECT_URL'),
      clientSecret: Env.get('DISCORD_CLIENT_SECRET'),
    },
  },
};
