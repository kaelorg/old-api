class AuthController {
  verify() {
    return { ok: true };
  }

  async redirect({ ally }) {
    await ally.driver('discord').redirect();
  }

  async authenticate({ auth, ally, response }) {
    const {
      _original: user,
      _tokenFields: { expires, accessToken, refreshToken },
    } = await ally.driver('discord').getUser();
    const { token, type } = await auth.generate(
      user,
      {
        id: user.id,
        accessToken,
        refreshToken,
      },
      { expiresIn: expires },
    );

    response.redirect(
      `${
        process.env.DASHBOARD_URL || 'https://dash.kaelbot.xyz'
      }/login?${new URLSearchParams({ token, type }).toString()}`,
    );
  }
}

module.exports = AuthController;
