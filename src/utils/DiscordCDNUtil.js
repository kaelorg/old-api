const CDN_URL = 'https://cdn.discordapp.com';

const ALLOWED_IMAGE_FORMATS = ['webp', 'png', 'jpg', 'jpeg', 'gif'];
const ALLOWED_IMAGE_SIZES = Array.from({ length: 9 }, (_, i) => 2 ** (i + 4));

class DiscordCDNUtil {
  static asset(name) {
    return `${CDN_URL}/assets/${name}`;
  }

  static emoji(emojiId, format = 'png') {
    return `${CDN_URL}/emojis/${emojiId}.${format}`;
  }

  static defaultAvatar(discriminator) {
    return `${CDN_URL}/embed/avatars/${discriminator}.png`;
  }

  static avatar(userId, hash, { size, format = 'webp', dynamic = false } = {}) {
    if (dynamic) format = hash.startsWith('a_') ? 'gif' : format;
    return this.makeImageUrl(`${CDN_URL}/avatars/${userId}/${hash}`, {
      format,
      size,
    });
  }

  static icon(guildId, hash, { size, format = 'webp', dynamic = false } = {}) {
    if (dynamic) format = hash.startsWith('a_') ? 'gif' : format;
    return this.makeImageUrl(`${CDN_URL}/icons/${guildId}/${hash}`, {
      format,
      size,
    });
  }

  static makeImageUrl(root, { format = 'webp', size } = {}) {
    if (format && !ALLOWED_IMAGE_FORMATS.includes(format)) {
      throw new Error('IMAGE_FORMAT', format);
    }
    if (size && !ALLOWED_IMAGE_SIZES.includes(size)) {
      throw new RangeError('IMAGE_SIZE', size);
    }

    return `${root}.${format}${size ? `?size=${size}` : ''}`;
  }
}

module.exports = DiscordCDNUtil;
