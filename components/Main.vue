<template>
<div class="h-screen w-full overflow-hidden relative">
    <div class="bg-black  flex w-full">

        <!-- Sidebar Component -->
        <div class="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[14rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
            <div class="space-y-2 sm:space-y-4 ">
                <button class="flex items-center space-x-2 hover:text-white sm:space-x-1">
                    <IconHome class="w-5 h-5" />
                    <p>Home</p>
                </button>
                <button class="flex items-center space-x-2 hover:text-white sm:space-x-1">
                    <IconSearch class="w-5 h-5" />
                    <p>Search</p>
                </button>
                <button class="flex items-center space-x-2 hover:text-white sm:space-x-1">
                    <IconLibrary class="w-5 h-5" />
                    <p>Your Library</p>
                </button>
                <hr  class="border-t-[0.1px] border-gray-900">
                <button class="flex items-center space-x-2 hover:text-white sm:space-x-1">
                    <IconPlusCircle class="w-5 h-5" />
                    <p>Create Playlist</p>
                </button>
                <button class="flex items-center space-x-2 hover:text-white sm:space-x-1">
                    <IconHeart class="w-5 h-5" />
                    <p>Liked Songs</p>
                </button>
                <button class="flex items-center space-x-2 hover:text-white sm:space-x-1">
                    <IconRss class="w-5 h-5" />
                    <p>Your Episodes</p>
                </button>
                <hr  class="border-t-[0.1px] border-gray-900">

                <!-- playlists here -->
                <div v-for="playlist in playlists.items" :key="playlist.id" class="cursor-pointer hover:text-white">
                   <button @click =" changeHeaderColorAndFetch(playlist) " class="focus:text-yellow-400 active:text-yellow-400 truncate">{{playlist.name}}</button> 
                </div>
            </div>
        
        </div>
        <!-- Sidebar component ends here -->

        <!-- Center Component -->
        <div class="flex-grow h-screen overflow-y-scroll scrollbar-hide pb-20 relative">
            <header class="absolute top-5 right-8 text-white" v-if="$auth.user">
                <div class="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2" @click="$auth.logout()">
                    <img :src="$auth.user.images[0].url" alt="profile pic" class="rounded-full w-10 h-10" v-if="$auth.user.images[0]">
                    <h2>{{$auth.user.display_name}}</h2>
                    <IconChevrondown class="w-5 h-5" />                   
                    <IconLogout class="w-5 h-5"/>
                </div>
            </header>
            
            <section   :class ="selected"  >
                <h1 v-if="!currentPlaylist" class="font-bold text-3xl m-auto text-black font-serif">
                    Welcome to Spotify
                </h1>
                <div v-if="$fetchState.pending" class="m-auto relative">
                    <h1 class="text-black font-bold">Getting tracks ...</h1>
                    <img src="~assets/loading.svg" alt="Loading..." width="80px" class="text-black"/>
                </div>
                <div v-else class="flex items-end space-x-7">
                    <img :src="currentPlaylist.images[0].url" alt="" class="w-44 h-42 shadow-2xl" v-if="currentPlaylist">
                    <!-- {{currentTracks}} -->
                    <div>
                        <p v-if="currentPlaylist">PLAYLIST</p>
                        <h1 class="text-2xl md:text-3xl lg:text-5xl font-bold">{{currentPlaylist.name}}</h1>
                    </div>
                </div>
            </section>

            <!-- Tracks here -->
            <div v-if="currentPlaylist && !$fetchState.pending" class="px-8">
                <div v-for="(track, index) in currentTracks.items" :key="track.id" @click="setSelectedTrackAndPlay(track)" class=" space-y-1 grid grid-cols-2 text-gray-500 py-4 px-2 hover:bg-gray-800 rounded-lg cursor-pointer">
                    <div class="flex items-center space-x-4 cursor-pointer ">
                        <p>{{index + 1}}</p>
                        <img :src="track.track.album.images[0].url" alt="" class="h-10 w-10">
                        <div>
                            <p class="w-36 lg:w-64 text-gray-100 truncate">{{track.track.name}}</p>
                            <p class="w-40 truncate">{{track.track.artists[0].name}}</p>
                        </div>
                    </div>
                    <div class=" flex items-center ml-auto md:ml-0 justify-between">
                        <p class="hidden md:inline  w-48 lg:w-52">{{track.track.album.name}}</p>
                        <p>{{milliToMinuteAndSecond(track.track.duration_ms)}}</p>
                    </div>
                </div>

            </div>
            <!-- Tracks end here -->

        </div>
        <!-- Center component ends here -->
    </div>
        <div class="sticky text-white bottom-0 left-0 h-24 bg-gray-900  grid grid-cols-3 text-xs md:text-base px-2 md:px-8 border-t border-gray-900">
            <div class="flex items-center space-x-4">
                <img :src="selectedTrack.album.images[0].url" alt="" v-if="selectedTrack" class="hidden md:inline w-10 h-10">
                <div>
                    <h3 v-if="selectedTrack">{{selectedTrack.name}}</h3>
                    <p v-if="selectedTrack">{{selectedTrack.artists[0].name}}</p>
                </div>
            </div>
            <div class="flex items-center justify-evenly ">
                <div > 
                    <IconSwitchHorizontal class="button" />
                </div>
                <div @click="previous()">
                    <IconPrevious  class="button" />
                </div>
                {{is_Playing}}
                <div @click="pause()" v-if="isPlaying">
                    <IconPause class="button" />
                </div>
                <div @click="resumePlayback()" v-if="!isPlaying">
                    <IconPlay class="button" />
                </div>
                <!-- this call controls only the activated spotify device and not on this clone -->
                <div @click="next()" >
                    <IconNext class="button" />
                </div>
                <div>
                    <IconRepeat class="button" />
                </div>
                
            </div>
            <div class="flex items-center space-x-2 md:space-x-4 justify-end">
                <div>
                    <IconVolume class="button"/>
                </div>
                <input type="range" min="0" max="100" v-model="volume" class="w-14 h-1 md:w-24 appearance-none bg-gray-100 slider-thumb rounded-full " @change="setVolume()" >
                <p class="hidden md:inline">{{volume}}</p>
            </div>
        </div>
</div>
</template>

<script>
import {shuffle} from 'lodash';
import {spotifyApi} from '~/lib/spotify.js';
    export default {
        props: ['playlists'],

        data(){
            return {
                colors:[
                    "flex  space-x-7 bg-gradient-to-b to-black  h-80 text-white p-8 from-red-500",
                    "flex  space-x-7 bg-gradient-to-b to-black  h-80 text-white p-8 from-green-500",
                    "flex  space-x-7 bg-gradient-to-b to-black  h-80 text-white p-8 from-yellow-500",
                    "flex  space-x-7 bg-gradient-to-b to-black  h-80 text-white p-8 from-pink-500",
                    "flex  space-x-7 bg-gradient-to-b to-black  h-80 text-white p-8 from-purple-500",
                ],
                selected: "flex space-x-7 bg-gradient-to-b to-black  h-80 text-white p-8 from-red-500",
                currentPlaylist: '',
                currentTracks: {},
                selectedTrack: '',
                isPlaying: '',
                volume: 50
            }
        },

    // computed properties
        created(){
            this.currentPlaylist = this.playlists.items[0]
            this.currentTracks = this.$fetch(`${this.currentPlaylist.tracks.href}`, {
                headers: {Authorization: this.$auth.strategy.token.get()}
                });
        },
        mounted(){
             spotifyApi.getMyCurrentPlaybackState()
                    .then(function(data) {
                        // Output items
                        if (data.body && data.body.is_playing) {
                        this.isPlaying = true
                        } else {
                        this.isPlaying = false
                        }
                    }, function(err) {
                        console.log('Something went wrong!', err);
                    })

        },

    // Methods
        methods: {
            changeHeaderColorAndFetch(playlist){
                this.selected = shuffle(this.colors).pop();
                this.currentPlaylist = playlist
                this.$fetch()
            },

            milliToMinuteAndSecond(millis){
                const minutes = Math.floor(millis / 60000);
                const seconds = ((millis % 60000) / 1000).toFixed();
                return seconds == 60 ? minutes + 1 + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
            },

            setSelectedTrackAndPlay(track){
                this.selectedTrack = track.track
                this.isPlaying= true
                this.startNewPlayback()
            },


           pause(){
               this.isPlaying = false
               fetch('https://api.spotify.com/v1/me/player/pause', {
                    method: 'PUT',
                    headers: {
                        Authorization: this.$auth.strategy.token.get()
                    }
                }).then(res => res.json()).catch(err => console.log(err))
           },

           resumePlayback(){
               this.isPlaying = true
               fetch('https://api.spotify.com/v1/me/player/play', {
                    method: 'PUT',
                    headers: {
                        Authorization: this.$auth.strategy.token.get()
                    }
                }).then(res => res.json()).catch(err => console.log(err))
           },
           startNewPlayback(){
               spotifyApi.setAccessToken(this.$auth.strategy.token.get().replace('Bearer ', ''))
            //    spotifyApi.setAccessToken()
               spotifyApi.play({
                   uris: [this.selectedTrack.uri]
               })
           },

           next(){
               fetch('https://api.spotify.com/v1/me/player/next', {
                    method: 'POST',
                    headers: {
                        Authorization: this.$auth.strategy.token.get()
                    }
                }).then(res => res.json()).catch(err => console.log(err))
           },
           
           previous(){
               fetch('https://api.spotify.com/v1/me/player/previous', {
                    method: 'POST',
                    headers: {
                        Authorization: this.$auth.strategy.token.get()
                    }
                }).then(res => res.json()).catch(err => console.log(err))
           },

           setVolume(){
                spotifyApi.setVolume(this.volume)
                    .then(function () {
                        console.log('Setting volume to' + this.volume);
                        }, function(err) {
                        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                        console.log('Something went wrong!', err);
                    });
           }

        },
        async fetch(){
            this.currentTracks = await fetch(`${this.currentPlaylist.tracks.href}`, {
                headers: {Authorization: this.$auth.strategy.token.get()}
                }).then(res => res.json())
            
        },
        
        
    }
</script>

