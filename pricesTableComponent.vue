<template>
	<div class="overflow-x-auto shadow-xl text-gray-950 shadow-gray-950/10 sm:rounded-lg">
		<template v-if="pricesPacksArray.length > 0">
			<div class="px-1 py-1">
				<h2 class="text-xl lg:text-2xl font-bold text-center my-4 text-green-950 uppercase">pojedyncze zabiegi</h2>
				<table class="table-fixed">
					<thead class="uppercase">
						<tr class="sm:text-lg lg:text-2xl">
							<th class="py-2 px-2 text-left">ZABIEG</th>
							<th class="py-2 px-2">CZAS [MIN]</th>
							<th class="py-2 px-2">CENA [ZŁ]</th>
						</tr>
					</thead>
					<tbody v-for="obj in pricesArray" :key="obj" key="obj">
						<tr class="sm:text-lg lg:text-2xl">
							<td class="border-b-2 border-slate-300 py-2 px-2 font-semibold">
								{{ obj.MASAŻ }}
							</td>
							<td class="border-b-2 border-slate-300 py-2 px-2 font-semibold text-center">
								{{ obj.CZAS }}
							</td>
							<td class="border-b-2 border-slate-300 py-2 px-2 font-semibold text-center">
								{{ obj.CENA }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="px-1 py-1">
				<h2 class="text-xl lg:text-2xl font-bold text-center my-4 text-green-950 uppercase">pakiety</h2>
				<table class="table-fixed">
					<thead class="uppercase">
						<tr class="sm:text-lg lg:text-2xl">
							<th class="py-2 px-2 text-left">ZABIEG</th>
							<th class="py-2 px-2">CZAS [MIN]</th>
							<th class="py-2 px-2">CENA [ZŁ]</th>
						</tr>
					</thead>
					<tbody v-for="obj in pricesPacksArray" :key="obj" key="obj">
						<tr class="sm:text-lg lg:text-2xl">
							<td class="border-b-2 border-slate-300 py-2 px-2 font-semibold">
								{{ obj.MASAŻ }}
							</td>
							<td class="border-b-2 border-slate-300 py-2 px-2 font-semibold text-center">
								{{ obj.CZAS }}
							</td>
							<td class="border-b-2 border-slate-300 py-2 px-2 font-semibold text-center">
								{{ obj.CENA }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</template>
	</div>
</template>

<script setup>
import axios from 'axios'
const pricesArray = ref([])
const pricesPacksArray = ref([])

const fetchData = async () => {
	try {
		const response = await axios.get('/displayPRICES.php')
		console.log(response.data)
		pricesArray.value = response.data
		fetchDataPricesPacks()
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}
const fetchDataPricesPacks = async () => {
	try {
		const response = await axios.get('/displayPRICESPACKS.php')

		pricesPacksArray.value = response.data
		showBar.value = false
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}

onMounted(() => {
	showBar.value = true
	setTimeout(() => {
		fetchData()
	}, 1500)
})
</script>
