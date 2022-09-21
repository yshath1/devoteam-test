<template>
	<div id="app" class="wrapper">
		<Header title="Meet the Team" />

		<div v-if="errorText" class="error-text">
			<h2 v-html="errorText"></h2>
		</div>

		<div v-if="isLoading" class="error-text">
			<h2>Loading users...</h2>
		</div>

		<div>
			<Grid :users="usersFiltered" v-if="toggleView === 'grid'" />
			<List :users="usersFiltered" v-else />
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import { eventBus } from '@/eventBus';
	import Header from '@/components/Header.vue';
	import Grid from '@/components/Grid.vue';
	import List from '@/components/List.vue';

	export default {
		name: 'App',
		components: {
			Header,
			Grid,
			List,
		},
		data() {
			return {
				users: [],
				errorText: '',
				isLoading: false,
				searchText: '',
				sortDirection: 'desc',
				toggleView: 'grid',
				bgColors: ['#a7b8a8', '#e1d3c7', '#e8cdad', '#e1d3c7', '#e8cdad', '#a7b8a8'],
			};
		},
		created() {
			eventBus.$on('sort-direction', ({ sortDirection }) => {
				this.sortDirection = sortDirection;
				this.usersSorted;
			});
			eventBus.$on('search-text', ({ searchText }) => {
				this.searchText = searchText;
			});
			eventBus.$on('toggle-view', ({ toggleView }) => {
				this.toggleView = toggleView;
			});
		},
		beforeDestroy() {
			eventBus.$off('sort-direction');
			eventBus.$off('search-text');
			eventBus.$off('toggle-view');
		},
		async mounted() {
			try {
				this.isLoading = true;

				const { data } = await axios.get('https://randomuser.me/api/?results=50');
				const iterator = this.getColor(this.bgColors);

				this.users = data.results
					.sort((a, b) => a.name.first.localeCompare(b.name.first))
					.map(user => {
						user.bgColor = iterator.next().value;
						return user;
					});
			} catch (err) {
				this.isLoading = false;
				this.errorText = 'Could not load users. <br /> Try reloading again!';
			} finally {
				this.isLoading = false;
			}
		},
		computed: {
			usersFiltered() {
				return this.users.filter(user => user.name.first.toLowerCase().includes(this.searchText.toLowerCase()));
			},
			usersSorted() {
				if (this.sortDirection === 'desc') {
					return this.users.sort((a, b) => a.name.first.localeCompare(b.name.first));
				} else {
					return this.users.sort((a, b) => b.name.first.localeCompare(a.name.first));
				}
			},
		},
		methods: {
			*getColor(colors) {
				let i = 0;
				while (true) {
					yield colors[i];
					i = (i + 1) % colors.length;
				}
			},
		},
	};
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&family=Lato:wght@400;700&family=Work+Sans:wght@400;700&display=swap');

	$ff-primary: 'Work Sans', sans-serif;

	$bg-clr: #ebe9e4;

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		background: $bg-clr;

		a:link,
		:visited,
		:hover,
		:active {
			color: #000;
		}
	}

	.wrapper {
		max-width: 850px;
		margin: 0 auto;
		padding: 2rem;

		& .error-text {
			font-family: $ff-primary;
			text-align: center;
			margin-top: 8rem;
		}
	}

	@media screen and (min-width: 40em) {
		.wrapper {
			padding: 2rem 5rem;
		}

		.header-title {
			font-size: 3rem;
			line-height: 3.5rem;
			margin: 0.5rem 0 2rem -4.5rem;
		}

		.header-navbar {
			display: flex;
			flex-direction: row;

			&__search {
				flex-grow: 1;
				margin: 0 0.875rem;
			}

			&__search input {
				width: 300px;
			}

			&__sort {
				flex-shrink: 1;
				order: -1;
			}
		}

		.grid-wrapper {
			grid-gap: 2.5rem;
			grid-template-areas:
				'one two three'
				'four five six';

			& .grid-item {
				min-height: 340px;

				&__name {
					font-size: 1.125rem;
					padding-top: 3.5rem;
				}

				&__img {
					margin-top: 8rem;
				}

				&__country {
					font-size: 0.875rem;
					margin-top: 3.5rem;
				}

				&__contact {
					margin-bottom: 1.5rem;
					font-size: 1.1rem;
					padding-top: 1rem;

					a:first-child {
						font-size: 1.375rem;
						margin-right: 0.625rem;
					}
				}
			}
		}

		.list-wrapper {
			& .list-item {
				padding: 0.5rem 2rem;

				&__curve {
					left: 4.225rem;
				}

				&__content {
					justify-content: center;
					align-items: center;
				}

				&__img {
					padding-right: 1.25rem;
				}

				&__name {
					padding-top: 0;
				}

				&__country {
					font-size: 0.875rem;
				}

				&__contact {
					align-items: center;
				}
			}
		}
	}
</style>
