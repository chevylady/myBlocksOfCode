import { defineStore } from 'pinia'
import { useShoppingBag } from './shoppingBag'
import axios from 'axios'

export const useShop = defineStore('shop', {
	state: () => {
		return {
			modal: false,
			shopItems: [],
		}
	},

	actions: {
		async fetchShopItems() {
			try {
				const response = await axios.get('/productsDatabase.php')
				const data = await response.data

				// Dodajemy property amount do każdego obiektu
				this.shopItems = data.map(item => ({
					...item,
					amount: 0,
					option: 'S',
				}))
			} catch (error) {
				console.error('Failed to fetch shop items:', error)
			}
		},
		increaseAmount(index) {
			if (this.shopItems[index]) {
				if (typeof this.shopItems[index].amount === 'undefined') {
					this.shopItems[index].amount = 0
				} else if (this.shopItems[index].amount < this.shopItems[index].Ilosc) {
					this.shopItems[index].amount++
				}
			}
		},
		decreasAmount(index) {
			this.shopItems[index].amount--
		},
		addToBag(index) {
			const storeShoppingBag = useShoppingBag()
			let shopObject = this.shopItems[index]
			let newShopObject = { ...shopObject }

			storeShoppingBag.pushToBag(newShopObject)
			this.shopItems[index].amount = 0
		},
	},
})
