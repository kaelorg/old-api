class AuthController {
  verify() {
    return { ok: true };
  }

  async redirect({ ally }) {
    await ally.driver('discord').redirect();
  }

  async authenticate({ auth, ally }) {
    const {
      _original: user,
      _tokenFields: { expires, accessToken, refreshToken },
    } = await ally.driver('discord').getUser();
    const { token, type: tokenType } = await auth.generate(
      user,
      {
        id: user.id,
        accessToken,
        refreshToken,
      },
      { expiresIn: expires },
    );

    return { user, token, tokenType };
  }
}

module.exports = AuthController;
