const RequestStructure = require('../structures/RequestStructure');

class ImgurHelper extends RequestStructure {
  constructor() {
    super({
      apiUrl: 'https://api.imgur.com/3',
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      },
    });
  }

  /**
   * @param {string} imageHash
   * @returns {Promise<boolean>}
   */
  isValidImage(imageHash) {
    return this.fetch(`/image/${imageHash}`)
      .then(() => true)
      .catch(() => false);
  }
}

module.exports = ImgurHelper;
