<template>
	<div class="pixels-wrapper position-relative m-0 p-0">
		<div class="spaceBox position-absolute"></div>
	</div>
</template>
<script setup>
import { onMounted } from 'vue'
onMounted(() => {
	const delayFunction = ms => new Promise(resolve => setTimeout(resolve, ms))
	document.body.style.overflow = 'hidden'
	window.scrollTo(0, 0)
	const spaceBox = document.querySelector('.spaceBox')
	for (let i = 0; i < 3; i++) {
		const shoots = document.createElement('div')
		shoots.setAttribute('class', 'laser')
		shoots.setAttribute('alt', 'lasers')
		document.body.append(shoots)
		spaceBox.append(shoots)
	}

	// ANIMATION WITH SETTIMEOUT......callback hell...............///

	// setTimeout(()=>{
	// 	const laserShoots = document.querySelectorAll('.laser')
	// 	let delay = 1
	// 	laserShoots.forEach((el, index) => {
	// 		el.classList.add('shoot')
	// 		el.style.animationDelay = '.' + delay * index + 's'
	// 		el.style.marginLeft = `${index * 33}px`
	// 		delay++
	// 	})
	// }, 100)

	// const invader = document.createElement('img')
	// invader.setAttribute('src', '../assets/invader.png')
	// invader.setAttribute('class', 'invaderAnimation')
	// document.body.append(invader)
	// spaceBox.append(invader)

	// setTimeout(() => {
	// 	const ship = document.createElement('img')
	// 	ship.setAttribute('src', '../assets/spaceship.png')
	// 	ship.setAttribute('class', 'shipAnimation')
	// 	document.body.append(ship)
	// 	spaceBox.append(ship)
	// }, 500)
	// setTimeout(() => {
	// 	document.body.style.overflow = 'auto'
	// }, 2800)

	//PROMISE method THEN ....................../

	// delayFunction(100)
	// 	.then(() => {
	// 		const laserShoots = document.querySelectorAll('.laser')
	// 		let delay = 1
	// 		laserShoots.forEach((el, index) => {
	// 			el.classList.add('shoot')
	// 			el.style.animationDelay = '.' + delay * index + 's'
	// 			el.style.marginLeft = `${index * 33}px`
	// 			delay++
	// 		})
	// 	})
	// 	.then(() => {
	// 		const invader = document.createElement('img')
	// 		invader.setAttribute('src', '../assets/invader.png')
	// 		invader.setAttribute('class', 'invaderAnimation')
	// 		document.body.append(invader)
	// 		spaceBox.append(invader)
	// 		return delayFunction(500)
	// 	})
	// 	.then(() => {
	// 		const ship = document.createElement('img')
	// 		ship.setAttribute('src', '../assets/spaceship.png')
	// 		ship.setAttribute('class', 'shipAnimation')
	// 		document.body.append(ship)
	// 		spaceBox.append(ship)
	// 		return delayFunction(2800)
	// 	})
	// 	.then(() => {
	// 		document.body.style.overflow = 'auto'
	// 	})

	//  ASYNC AWAIT...////////////

	const runDelayFunction = async () => {
		await delayFunction(100)
		const laserShoots = document.querySelectorAll('.laser')
		let delay = 1
		laserShoots.forEach((el, index) => {
			el.classList.add('shoot')
			el.style.animationDelay = '.' + delay * index + 's'
			el.style.marginLeft = `${index * 33}px`
			delay++
		})
		const invader = document.createElement('img')
		invader.setAttribute('src', '../assets/invader.png')
		invader.setAttribute('class', 'invaderAnimation')
		invader.setAttribute('alt', 'invader icon')
		document.body.append(invader)
		spaceBox.append(invader)
		await delayFunction(500)
		const ship = document.createElement('img')
		ship.setAttribute('src', '../assets/spaceship.png')
		ship.setAttribute('class', 'shipAnimation')
		ship.setAttribute('alt', 'spaceship icon')
		document.body.append(ship)
		spaceBox.append(ship)
		await delayFunction(2800)
		document.body.style.overflow = 'auto'
	}
	runDelayFunction()
})
</script>
<style lang="scss">
.pixels-wrapper {
	z-index: 350;
	width: 100%;
	height: 100%;

	.spaceBox {
		left: 20%;
		.shipAnimation,
		.invaderAnimation {
			height: 4em;
			width: 3.4em;
		}
		.shipAnimation {
			animation: shipMoves 2.8s forwards cubic-bezier(0.445, 0.05, 0.55, 0.95);
		}
		.invaderAnimation {
			animation: invaderMoves 1.8s forwards cubic-bezier(0.86, 0, 0.07, 1);
		}
		.laser {
			opacity: 0;
		}
		.shoot {
			height: 0.3em;
			width: 0.3em;
			background-color: white;
			animation: shootMoves 1s forwards linear;
		}
	}
}

@keyframes shipMoves {
	0% {
		margin-top: 110vh;
	}
	20% {
		transform: rotate(15deg);
	}
	40% {
		transform: rotate(15deg);
		transform: translateX(170%);
	}
	60% {
		transform: translateX(170%);
	}

	100% {
		margin-top: -40vh;
		transform: translateX(40%);
	}
}
@keyframes invaderMoves {
	from {
		margin-top: 110vh;
	}

	to {
		margin-top: -40vh;
		transform: translateX(200%);
	}
}
@keyframes shootMoves {
	from {
		transform: translateY(110vh);
		opacity: 1;
	}
	to {
		transform: translateY(-30vh);
		opacity: 1;
	}
}
</style>
