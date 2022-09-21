import { shallowMount } from '@vue/test-utils';
import { mockUsers } from '../mocks/mockUsers';
import Grid from '@/components/Grid.vue';

const factory = propsData => {
	return shallowMount(Grid, {
		propsData: {
			users: mockUsers,
			...propsData,
		},
	});
};

describe('Grid.vue', () => {
	it('renders grid item', () => {
		const wrapper = factory();
        
		expect(wrapper.find('.grid-wrapper').isVisible()).toBe(true);
		expect(wrapper.find('.grid-item').isVisible()).toBe(true);
		expect(wrapper.find('.grid-item__name').isVisible()).toBe(true);
		expect(wrapper.find('.grid-item__img').isVisible()).toBe(true);
		expect(wrapper.find('.grid-item__country').isVisible()).toBe(true);
		expect(wrapper.find('.grid-item__contact').isVisible()).toBe(true);

        expect(wrapper.find('.grid-item__name').text()).toBeTruthy();
        expect(wrapper.find('.grid-item__country').text()).toBeTruthy();
	});
});
