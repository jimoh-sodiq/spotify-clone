<template>
    <div class="flex items-center  flex-col space-y-2 p-20 bg-black min-h-screen text-center">
        <IconSpotify class="w-35 h-35 " />
        <div class=" flex flex-col  space-y-4 ">
            <button class="w-full  font-bold p-2 px-12 rounded-md hover:opacity-80" style="background: #1ED760;" @click="$auth.loginWith('social')" >Login with Spotify</button>
        </div>
        <p class="text-gray-400 text-sm">Please activate your spotify player on your device registered with spotify</p>
        <p class="text-gray-400 text-sm">in order to access the functionality of the clone.</p>
        <p class="text-gray-400 text-sm">A Spotify Account is needed for user authentication. </p>
        <p class="text-gray-400 text-sm">A premium spotify account is needed for the controls to funtion </p>
        <p class="text-gray-400 text-sm">The previous and Next controls only works on the activated spotify device</p>

    </div>
</template>

<script>
    export default {

    }
</script>
