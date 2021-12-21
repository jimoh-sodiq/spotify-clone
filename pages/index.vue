<template>
  <div>
    <main class="bg-black h-screen overflow-hidden flex">
      <Main :playlists= "playlists" />
    </main>

  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data(){
    return {
      playlists : []
    }
  },

  async fetch(){
            this.playlists = await fetch('https://api.spotify.com/v1/me/playlists',{
                headers: {Authorization: this.$auth.strategy.token.get()}
                }
            ).then(res => res.json())
        }
        
}
</script>
