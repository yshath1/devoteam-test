import { shallowMount } from '@vue/test-utils';
import { mockUsers } from '../mocks/mockUsers';
import List from '@/components/List.vue';

const factory = propsData => {
	return shallowMount(List, {
		propsData: {
			users: mockUsers,
			...propsData,
		},
	});
};

describe('List.vue', () => {
	it('renders list item', () => {
		const wrapper = factory();
        
		expect(wrapper.find('.list-wrapper').isVisible()).toBe(true);
		expect(wrapper.find('.list-item').isVisible()).toBe(true);
		expect(wrapper.find('.list-item__name').isVisible()).toBe(true);
		expect(wrapper.find('.list-item__img').isVisible()).toBe(true);
		expect(wrapper.find('.list-item__country').isVisible()).toBe(true);
		expect(wrapper.find('.list-item__contact').isVisible()).toBe(true);

        expect(wrapper.find('.list-item__name').text()).toBeTruthy();
        expect(wrapper.find('.list-item__country').text()).toBeTruthy();
	});
});
