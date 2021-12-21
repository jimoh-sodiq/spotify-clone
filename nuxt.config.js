export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Spotify Clone',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/callback',
      home: '/'
    },
    strategies: {
      local: false,
      social: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://accounts.spotify.com/authorize',
          token: undefined,
          userInfo: 'https://api.spotify.com/v1/me',
          logout: 'http://localhost:3000/login',
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'token',
        grantType: 'authorization_code',
        accessType: undefined,
        redirectUri: 'http://localhost:3000/callback',
        logoutRedirectUri: 'http://localhost:3000/login',
        clientId: $config.clientId,
        scope: ['playlist-read-private', 'playlist-modify-private', 'user-read-private','user-read-email', 'playlist-read-collaborative','streaming','user-library-read'],
        state: 'UNIQUE_AND_NON_GUESSABLE',
        codeChallengeMethod: '',
        responseMode: '',
        acrValues: '',
        // autoLogout: false
      }
     
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  privateRuntimeConfig: {
    clientId : process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET

  }
}