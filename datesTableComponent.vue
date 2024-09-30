<template>
	<div class="shadow-xl text-gray-950 shadow-gray-950/10 sm:rounded-lg">
		<h2 class="text-center">REZERWACJA ON-LINE</h2>
		<p class="mx-auto p-3 text-base lg:text-lg">
			Terminy dla rezerwacji online są dostępne od 1 lipca. Każdy blok trwa 30 minut i w zależności od wybranej długości
			masażu należy wybrać tyle bloków ile to koniecznie np. dla masażu 90-minutowego należy wybrać 3 bloki po 30 minut
			następujące po sobie. Aby wybrać termin kliknij przycisk z łapką w kolumnie "wybierz". Po wybraniu terminu należy
			wypełnić formularz znajdujący się pod terminami i wysłać rezerwację. Potwierdzenie otrzymają Państwo na podany
			adres email.
		</p>
		<p class="mx-auto p-3 mb-1 text-base lg:text-lg">
			<strong>Ważna informacja:</strong> przy pojedynczej rezerwacji online można wybrać maksymalnie 6 bloków.
		</p>
		<template v-if="showBar">
			<UProgress animation="carousel" />
		</template>
		<div class="my-2 px-2 flex flex-row items-center justify-center gap-2">
			<label for="date" class="mb-3 text-sm font-medium text-gray-950">Szukaj terminu</label>
			<input
				type="date"
				name="date"
				id="searchInput"
				v-model="dateVal"
				:min="datePicker"
				:max="maxDateFormatted"
				class="px-3 py-2 mb-3 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500" />
			<button
				@click.prevent="dateForSearch()"
				type="submit"
				class="mb-3 bg-green-700 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 transition ease-out duration-300">
				<svg
					class="w-4 h-4 text-gray-100 dark:text-gray-100"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
				</svg>
			</button>
			<button
				@click.prevent="resetDates()"
				type="submit"
				class="mb-3 bg-sky-900 text-white uppercase hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 transition ease-out duration-300">
				resetuj terminy
			</button>
		</div>
		<div class="overflow-y-auto customHeight">
			<template v-if="arrayDataFiltered.length > 0">
				<table class="w-full text-sm text-left rtl:text-right text-gray-600">
					<thead class="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" class="px-6 py-3">TERMIN</th>
							<th scope="col" class="px-6 py-3">GODZINA</th>
							<th scope="col" class="px-2 py-3">WYBIERZ</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(obj, index) in arrayDataFiltered" :key="index" class="bg-white border-b hover:bg-gray-50">
							<td class="px-6 py-4">
								{{ obj.TERMIN }}
							</td>
							<td class="px-6 py-4">
								{{ obj.GODZINA.slice(0, -3) }}
							</td>
							<td class="px-1 py-4 text-left">
								<button
									type="button"
									@click="chooseDataFiltered(index)"
									:disabled="disabledButtons[index]"
									class="ChooseBtn focus:outline-none text-white bg-green-800 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
									<template v-if="disabledButtons[index]">
										{{ btnDisabledTxt }}
									</template>
									<template v-else><p>&#128072;</p></template>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</template>
			<template v-if="arrayDataFiltered.length < 1">
				<table class="w-full text-sm text-left rtl:text-right text-gray-600">
					<thead class="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" class="px-6 py-3">TERMIN</th>
							<th scope="col" class="px-6 py-3">GODZINA</th>
							<th scope="col" class="px-2 py-3">WYBIERZ</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(obj, index) in arrayData.slice(0, 800)" :key="index" class="bg-white border-b hover:bg-gray-50">
							<td class="px-6 py-4">
								{{ obj.TERMIN }}
							</td>
							<td class="px-6 py-4">
								{{ obj.GODZINA.slice(0, -3) }}
							</td>
							<td class="px-2 py-4 text-left">
								<button
									type="button"
									@click="chooseData(index)"
									:disabled="disabledButtons[index]"
									:class="{ 'bg-grey-800': disabledButtons[index] }"
									class="focus:outline-none text-white bg-green-800 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
									<template v-if="disabledButtons[index]">
										{{ btnDisabledTxt }}
									</template>
									<template v-else><p>&#128072;</p></template>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</template>
		</div>
	</div>
</template>

<script setup>
import axios from 'axios'
import { useStore } from '../stores/store'

const storeStore = useStore()
const showBar = ref(null)
const arrayData = ref([])
const btnDisabledTxt = ref('zajęty')
const dateVal = ref('')
const arrayDataFiltered = ref([])
const disabledButtons = ref([])
const array = ref([])

const datePicker = new Date().toISOString().split('T')[0]

const datePickerMax = new Date()

const fromToday = datePickerMax.setDate(datePickerMax.getDate())
const fromTodayFormatted = new Date(fromToday).toISOString().split('T')[0]

datePickerMax.setDate(datePickerMax.getDate() + 60)
const maxDateFormatted = datePickerMax.toISOString().split('T')[0]

const fetchData = async () => {
	try {
		const response = await axios.get('/displaydata.php')

		array.value = response.data
		array.value.forEach(object => {
			if (object.DOSTEPNY === 'tak' && object.TERMIN >= fromTodayFormatted) {
				arrayData.value.push(object)
			}
		})
		showBar.value = false
		disabledButtons.value = Array(arrayData.value.length).fill(false)
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}

const dateForSearch = () => {
	arrayDataFiltered.value = []
	disabledButtons.value = []
	for (const obj of arrayData.value) {
		if (obj.TERMIN === dateVal.value) {
			arrayDataFiltered.value.push(obj)
			disabledButtons.value.push(false)
		}
	}
}

const chooseData = index => {
	if (storeStore.storedChosenDates.length < storeStore.limit) {
		const obj = arrayData.value[index]
		storeStore.storedChosenDates.push(obj)
		disabledButtons.value[index] = true
	} else {
		alert(`Limit pojedynczej rezerwacji: ${storeStore.limit}`)
	}
}
const chooseDataFiltered = index => {
	const obj = arrayDataFiltered.value[index]

	const alreadyChosen = storeStore.storedChosenDates.some(
		date => date.TERMIN === obj.TERMIN && date.GODZINA === obj.GODZINA
	)

	if (!alreadyChosen && storeStore.storedChosenDates.length < storeStore.limit) {
		disabledButtons.value[index] = true
		storeStore.storedChosenDates.push(obj)
		btnDisabledTxt.value = 'zajęty'
	} else {
		alert(`Termin został już wybrany!. Limit pojedynczej rezerwacji: ${storeStore.limit}.`)
	}
}
const resetDates = () => {
	storeStore.storedChosenDates = []
	disabledButtons.value = []
	arrayDataFiltered.value = []
	dateVal.value = ''
}
onMounted(() => {
	showBar.value = true
	setTimeout(() => {
		fetchData()
	}, 2000)
})
</script>
<style lang="css">
.customHeight {
	height: 40rem;
}
</style>

