<template>
	<header class="header-wrapper">
		<h1 class="header-title">{{ title }}</h1>
		<div class="header-navbar">
			<div class="header-navbar__search">
				<FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
				<input type="text" v-model="searchText" placeholder="Search users..." />
			</div>
			<div class="header-navbar__sort">
				<a href="#" aria-label="sort" @click.prevent="sortClicked">
					<FontAwesomeIcon :icon="sortIcon" />
				</a>
			</div>
			<div class="header-navbar__toggle">
				<a href="#" aria-label="toggle" @click.prevent="toggle">
					<FontAwesomeIcon :icon="toggleIcon"  />
				</a>
			</div>
		</div>
	</header>
</template>

<script>
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { eventBus } from '@/eventBus';

	export default {
		name: 'Header',
		components: { FontAwesomeIcon },
		props: {
			title: {
				type: String,
				reqired: true,
			},
		},
		data() {
			return {
				searchText: '',
				sortDirection: 'desc',
				toggleView: 'grid',
			};
		},
		watch: {
			searchText(value) {
				eventBus.$emit('search-text', { searchText: value });
			},
		},
		computed: {
			sortIcon() {
				return this.sortDirection === 'desc' ? ['fas', 'arrow-down-a-z'] : ['fas', 'arrow-up-a-z'];
			},
			toggleIcon() {
				return this.toggleView === 'grid' ? 'fa-solid fa-border-all' : 'fa-solid fa-bars';
			},
		},
		methods: {
			sortClicked() {
				this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';

				eventBus.$emit('sort-direction', { sortDirection: this.sortDirection });
			},
			toggle() {
				this.toggleView = this.toggleView === 'grid' ? 'list' : 'grid';

				eventBus.$emit('toggle-view', { toggleView: this.toggleView });
			},
		},
	};
</script>

<style lang="scss">
	.header-title {
		font-family: 'Work Sans', sans-serif;
		font-weight: 400;
		font-size: 1.5rem;
		line-height: 1.875rem;
	}

	.header-navbar {
		display: grid;
		grid-template-areas:
			'search search'
			'sort toggle';

		&__search {
			grid-area: search;
			margin: 2rem 0.225rem 1rem 0.225rem;

			position: relative;

			& svg {
				font-size: 0.875rem;
				left: 0.5rem;
				top: 0.275rem;
				position: absolute;
			}

			& input {
				border-radius: 4rem;
				border: none;
				height: 1.5rem;
				padding-left: 1.675rem;
				width: 100%;
			}
		}

		&__sort {
			grid-area: sort;
			font-size: 1.5rem;
			padding-left: 0.225rem;

			& > svg {
				cursor: pointer;
			}
		}

		&__toggle {
			grid-area: toggle;
			justify-self: flex-end;
			font-size: 1.5rem;
			padding-right: 0.225rem;

			& > svg {
				cursor: pointer;
			}
		}
	}
</style>
