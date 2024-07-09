<template>
	<section class="py-2 flex flex-col items-center">
		<div class="flex items-center flex-wrap">
			<h1 class="text-2xl lg:text-4xl text-teal-400 uppercase my-4 mr-4">dyskografia</h1>
			<subscribeBtnComponent />
		</div>
		<div class="my-4 discography w-full lg:w-3/4" v-for="(album, index) in storeDiscography.albums" :key="index">
			<p class="text-xl lg:text-2xl uppercase text-teal-400 font-raleway">{{ album.title }}</p>
			<div class="flex flex-wrap justify-around items-start gap-3 border border-teal-500 rounded-md shadow-xl shadow-teal-500 my-2 py-6 px-1">
				<div class="self-center">
					<img :src="album.src" alt="album cd" class="h-44 md:h-64" />
				</div>
				<div class="buttons">
					<small class="uppercase italic">posłuchaj</small>
					<div @click="playMusic(index)"  class="play py-1"><font-awesome :icon="faCirclePlay" style="color: cyan;" class="h-6 lg:h-8 hover:scale-75 transition-transform duration-300 cursor-pointer"/></div>
					<div @click="pauseMusic(index)" class="pause py-1"><font-awesome :icon="faCirclePause" style="color: cyan;" class="h-6 lg:h-8 hover:scale-75 transition-transform duration-300 cursor-pointer"/></div>
				</div>
				<div class="w-44 lg:w-60 xl:w-72">
					<p class="text-lg lg:text-2xl uppercase text-teal-400 font-raleway">Tracklist</p>
					<ul v-for="track in album.tracks" :key="track" class="flex">
						<li class="">{{ track }}</li>
					</ul>
				</div>
				<div class="w-44 lg:w-60 xl:w-72">
					<p class="text-lg lg:text-2xl uppercase text-teal-400 font-raleway">Band</p>
					<ul v-for="item in album.description" :key="item" class="flex">
						<li class="">{{ item }}</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="video-wrapper h-full w-full md:w-2/3 mt-5">
			<iframe
				src="https://www.youtube.com/embed/RwmjQn2fXGs"
				frameborder="0"
				class="w-full h-full"
				video-id="RwmjQn2fXGs"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen>
			</iframe>
		</div>
	</section>
</template>
<script setup>
import { useDiscography } from '../stores/discography'
import {faCirclePlay, faCirclePause} from '@fortawesome/free-regular-svg-icons'

const storeDiscography = useDiscography()
const isPlaying = ref(false);
const currentAudio = ref(null);

onMounted(() => {
	const subscribeButton = document.createElement('script')
	subscribeButton.src = 'https://apis.google.com/js/platform.js'
	subscribeButton.setAttribute('class', 'yt-script')
	document.body.appendChild(subscribeButton)
})
onUnmounted(() => {
	const subscribeButtonToRemove = document.querySelector('.yt-script')
	document.body.removeChild(subscribeButtonToRemove)
})

const playMusic = (index)=>{
	if (currentAudio.value) {
    currentAudio.value.pause();
  }

  currentAudio.value = new Audio(storeDiscography.albums[index].soundPath);
  currentAudio.value.play();
  isPlaying.value = true;
};

const pauseMusic = () => {
  if (currentAudio.value) {
    currentAudio.value.pause();
    isPlaying.value = false;
  }
};

</script>

<style lang="scss" scoped>
  .video-wrapper {
    aspect-ratio: 16 / 9;
  }
</style>
