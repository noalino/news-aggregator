import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';
// Import non-connected Search component
import { Search } from './Search';

describe('When the form is submitted', () => {
  const mockSearchfn = jest.fn();
  const mockFetchSrcfn = jest.fn();
  
  test('should call the mockSearch function', () => {
    // Set all Search props here
    const wrapper = shallow(<Search searchArticles={mockSearchfn} fetchSources={mockFetchSrcfn} />);
    wrapper.find('.header').simulate(
      'submit',
      {preventDefault() {}}
    );
    expect(mockSearchfn.mock.calls.length).toBe(1);
  });
});
