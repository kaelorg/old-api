/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User');

const ImgurHelper = require('../../../src/helpers/ImgurHelper');
const Util = require('../../../src/utils/Util');

class UserController {
  async user({ auth, discord, response, params: { userId } }) {
    try {
      const helpers = userId === '@me' && auth.user;
      const user = await discord.requestUser(userId);

      return {
        user,
        helpers,
      };
    } catch ({ code, error }) {
      response.status(code).send(error);
    }
  }

  // Get user guilds

  async userGuilds({ discord, response }) {
    try {
      const guilds = await discord.user.getGuilds();
      return guilds;
    } catch ({ code, error }) {
      response.status(code).send(error);
    }
  }

  async userGuild({ discord, response, params: { guildId } }) {
    try {
      const guild = await discord.user.getGuild(guildId);
      return guild;
    } catch ({ code, error }) {
      response.status(code).send(error);
    }
  }

  // Edit current user

  async editUserProfile({ auth, request, response }) {
    const { bio, favColor, background } = request.only([
      'bio',
      'favColor',
      'background',
    ]);

    const [
      ,
      hash,
    ] = /^https:\/\/i\.imgur\.com\/([a-zA-Z0-9]{7})\.(png|jpg|jpeg)$/.exec(
      background,
    );

    const imgurHelper = new ImgurHelper();
    const isValidBackground = await imgurHelper.isValidImage(hash);

    if (!isValidBackground) {
      return response
        .status(400)
        .send({ message: 'The background url entered is invalid' });
    }

    await User.update(
      auth.user._id,
      Util.transformManyData('social', { bio, favColor, background }),
    );
  }
}

module.exports = UserController;
