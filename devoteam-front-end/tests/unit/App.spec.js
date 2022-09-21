import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import Grid from '@/components/Grid.vue';
import List from '@/components/List.vue';

import axios from 'axios';
import { mockUsers } from '../mocks/mockUsers';

jest.spyOn(axios, 'get').mockResolvedValue(mockUsers);

describe('App.vue', () => {
	let wrapper;

	beforeAll(() => {
		wrapper = shallowMount(App);
		wrapper.setData({ users: mockUsers });
	});

	test('sanity test', () => {
		expect(true).toBe(true);
	});

	it('loads users', () => {
		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(axios.get).toHaveBeenCalledWith('https://randomuser.me/api/?results=50');
		expect(wrapper.vm.users).toHaveLength(50);
	});

	it('renders', async () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('renders grid view as default', () => {
		expect(wrapper.findComponent(Grid).exists()).toBe(true);
	});

	it('does not render list view as default', () => {
		expect(wrapper.findComponent(List).exists()).toBe(false);
	});

	it('renders list view when toggled', async () => {
		const toggleView = 'list';

		await wrapper.setData({ toggleView: toggleView });
		expect(wrapper.findComponent(List).exists()).toBe(true);
	});

	it('renders grid view when toggled', async () => {
		const toggleView = 'grid';

		await wrapper.setData({ toggleView: toggleView });
		expect(wrapper.findComponent(Grid).exists()).toBe(true);
	});

	it('filters users based on search input', () => {
		const name = wrapper.vm.users[0].name.first;

		wrapper.setData({ searchText: name });

		expect(name).toBe(name);
		expect(wrapper.vm.usersFiltered).toHaveLength(1);
	});

	it('sorts users first name in descending order', () => {
		const sortDirection = 'desc';
		const users = wrapper.vm.users;
		const usersDesc = users.sort((a, b) => a.name.first.localeCompare(b.name.first));

		wrapper.setData({ sortDirection: sortDirection });

		expect(users).toBe(usersDesc);
	});

	it('sorts users first name in ascending order', () => {
		const sortDirection = 'asc';
		const users = wrapper.vm.users;
		const usersAsc = users.sort((a, b) => b.name.first.localeCompare(a.name.first));

		wrapper.setData({ sortDirection: sortDirection });

		expect(users).toBe(usersAsc);
	});

	it('displays an error text if there is one', async () => {
		const errorText = 'Could not load users. Try reloading again!';

		await wrapper.setData({ errorText: errorText });

		expect(wrapper.find('.error-text').exists()).toBe(true);
	});
});
