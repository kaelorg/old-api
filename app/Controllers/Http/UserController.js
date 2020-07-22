/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User');

const ImgurHelper = require('../../../src/helpers/ImgurHelper');
const Util = require('../../../src/utils/Util');

class UserController {
  async user({ auth, discord, response, params: { userId } }) {
    try {
      const user = await discord.getUser(userId);
      const helpers = userId === '@me' ? auth.user : undefined;

      return {
        helpers,
        user: user.toJSON(),
      };
    } catch (error) {
      Util.handleError(error, response);
    }
  }

  // Edit current user

  async editProfile({ auth, request, response }) {
    const { bio, favColor, background } = request.only([
      'bio',
      'favColor',
      'background',
    ]);

    if (background) {
      const [
        ,
        hash,
      ] = /^https:\/\/i\.imgur\.com\/([a-zA-Z0-9]{7})\.(png|jpg|jpeg)$/.exec(
        background,
      );

      const imgurHelper = new ImgurHelper();
      const validBackground = await imgurHelper.isValidImage(hash);

      if (!validBackground) {
        return response
          .status(400)
          .send({ message: 'The background url entered is invalid' });
      }
    }

    await User.update(
      auth.user._id,
      Util.transformData({ bio, favColor, background }, 'social'),
    );
  }
}

module.exports = UserController;
