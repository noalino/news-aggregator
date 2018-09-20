import React from 'react';
import { shallow } from 'enzyme';
import '../../setupTests';
// Import non-connected Search component
import { Search } from './Search';


describe('<Search />', () => {
  let wrapper;
  let mockSearchfn;
  let mockFetchSrcfn;
  let props;

  beforeEach(() => {
    mockSearchfn = jest.fn();
    mockFetchSrcfn = jest.fn();
    props = {
      country: {
        code: 'us',
        name: 'United States',
        language: {
          code: 'en',
          name: 'English'
        }
      },
      lastQuery: '',
      sources: [],
      articles: [],
      history: [],
      location: {
        search: '',
        state: undefined
      },
      searchArticles: mockSearchfn,
      fetchSources: mockFetchSrcfn
    };
  });

  describe('When component mounts', () => {

    describe('with no query', () => {
      beforeEach(() => {
        wrapper = shallow(<Search {...props} />);
      });

      it('should fetch sources', () => {
        expect(mockFetchSrcfn.mock.calls.length).toBe(1);
        expect(mockFetchSrcfn.mock.calls[0][0]).toBe('en');
      });
      it('should not search articles', () => {
        expect(mockSearchfn.mock.calls.length).toBe(0);
      });
    });

    describe('with query', () => {
      beforeEach(() => {
        const propsWithQuery = {
          ...props,
          location: { search: '?q=bitcoin', state: undefined }
        };
        wrapper = shallow(<Search {...propsWithQuery} />);
      });

      it('should fetch sources', () => {
        expect(mockFetchSrcfn.mock.calls.length).toBe(1);
        expect(mockFetchSrcfn.mock.calls[0][0]).toBe('en');
      });
      it('should search articles', () => {
        expect(mockSearchfn.mock.calls.length).toBe(1);
      });
    });
  });

  describe('When country/language changes', () => {
    
    describe('with no query', () => {
      beforeEach(() => {
        const newProps = {
          ...props,
          country: { language: { code: 'fr' }}
        };
        wrapper = shallow(<Search {...props} />);
        wrapper.setProps({...newProps});
      });

      it('should fetch sources', () => {
        expect(mockFetchSrcfn.mock.calls.length).toBe(2);
        expect(mockFetchSrcfn.mock.calls[1][0]).toBe('fr');
      });

      it('should not search articles', () => {
        expect(mockSearchfn.mock.calls.length).toBe(0);
      });
    });

    describe('with query', () => {
      beforeEach(() => {
        const newProps = {
          ...props,
          location: { search: '?q=bitcoin', state: undefined },
          country: { language: { code: 'fr' }}
        };
        wrapper = shallow(<Search {...props} />);
        wrapper.setProps({...newProps});
      });

      it('should fetch sources', () => {
        expect(mockFetchSrcfn.mock.calls.length).toBe(2);
        expect(mockFetchSrcfn.mock.calls[1][0]).toBe('fr');
      });

      it('should search articles', () => {
        expect(mockSearchfn.mock.calls.length).toBe(1);
      });
    });
  });

  describe('When query changes', () => {

    describe('with no options (request from nav searchbar)', () => {
      beforeEach(() => {
        const noOptionsProps = {
          ...props,
          location: { search: '?q=bitcoin', state: undefined }
        };
        wrapper = shallow(<Search {...noOptionsProps} />);
      });

      describe('when query === ""', () => {
        beforeEach(() => {
          const newProps = {
            ...props,
            location: { search: '', state: undefined }
          };
          wrapper.setProps({...newProps});
        });

        it('should search articles', () => { // SHOULD NOT (another way to reinitialize articles?)
          expect(mockSearchfn.mock.calls.length).toBe(2);
          expect(mockSearchfn.mock.calls[0][0].query).toBe('bitcoin');
          expect(mockSearchfn.mock.calls[1][0].query).toBe('');
        });
      });

      describe('when query === previous query', () => {
        beforeEach(() => {
          const newProps = {
            ...props,
            location: { search: '?q=bitcoin', state: undefined }
          };
          wrapper.setProps({...newProps});
        });

        it('should not search articles', () => {
          expect(mockSearchfn.mock.calls.length).toBe(1);
        });
      });

      describe('when query !== previous query', () => {
        beforeEach(() => {
          const newProps = {
            ...props,
            location: { search: '?q=art', state: undefined }
          };
          wrapper.setProps({...newProps});
        });

        it('should search articles', () => {
          expect(mockSearchfn.mock.calls.length).toBe(2);
          expect(mockSearchfn.mock.calls[0][0].query).toBe('bitcoin');
          expect(mockSearchfn.mock.calls[1][0].query).toBe('art');
        });
      });
    });

    describe('with options', () => {
      beforeEach(() => {
        const optionsProps = {
          ...props,
          location: { search: '?q=bitcoin', state: { from: '', to: '', source: '', sorting: 'publishedAt'} }
        };
        wrapper = shallow(<Search {...optionsProps} />);
      });

      describe('when query === ""', () => {
        beforeEach(() => {
          const newProps = {
            ...props,
            location: { search: '', state: { from: '', to: '', source: '', sorting: 'publishedAt'} }
          };
          wrapper.setProps({...newProps});
        });

        it('should search articles', () => { // SHOULD NOT (another way to reinitialize articles?)
          expect(mockSearchfn.mock.calls.length).toBe(2);
          expect(mockSearchfn.mock.calls[0][0].query).toBe('bitcoin');
          expect(mockSearchfn.mock.calls[1][0].query).toBe('');
        });
      });

      describe('when query === previous query', () => {
        beforeEach(() => {
          const newProps = {
            ...props,
            location: { search: '?q=bitcoin', state: { from: '', to: '', source: '', sorting: 'publishedAt'} }
          };
          wrapper.setProps({...newProps});
        });

        it('should not search articles', () => {
          expect(mockSearchfn.mock.calls.length).toBe(1);
        });
      });

      describe('when query !== previous query', () => {
        beforeEach(() => {
          const newProps = {
            ...props,
            location: { search: '?q=art', state: { from: '', to: '', source: '', sorting: 'publishedAt'} }
          };
          wrapper.setProps({...newProps});
        });

        it('should search articles', () => {
          expect(mockSearchfn.mock.calls.length).toBe(2);
          expect(mockSearchfn.mock.calls[0][0].query).toBe('bitcoin');
          expect(mockSearchfn.mock.calls[1][0].query).toBe('art');
        });
      });
    });
  });

  describe('When options change', () => {
    describe('with no query', () => {
      beforeEach(() => {
          const noQueryProps = {
            ...props,
            location: { search: '', state: { from: '', to: '', source: '', sorting: 'publishedAt'} }
          };
          wrapper = shallow(<Search {...noQueryProps} />);
        });

      describe('when options === previous options', () => {
        beforeEach(() => {
          const newProps = {
            ...props,
            location: { search: '', state: { from: '', to: '', source: '', sorting: 'publishedAt'} }
          };
          wrapper.setProps({...newProps});
        });

        it('should not search articles', () => {
          expect(mockSearchfn.mock.calls.length).toBe(0);
        });
      });

      describe('when options !== previous options', () => {
        beforeEach(() => {
          const newProps = {
            ...props,
            location: { search: '', state: { from: '30-01-1992', to: '20-09-2018', source: 'le-monde', sorting: 'relevancy'} }
          };
          wrapper.setProps({...newProps});
        });

        it('should not search articles', () => {
          // console.log(mockSearchfn.mock.calls);
          expect(mockSearchfn.mock.calls.length).toBe(0);
        });
      });
    });

    describe('with query', () => {
      beforeEach(() => {
        const withQueryProps = {
          ...props,
          location: { search: '?q=bitcoin', state: { from: '', to: '', source: '', sorting: 'publishedAt'} }
        };
        wrapper = shallow(<Search {...withQueryProps} />);
      });

      describe('when options === previous options', () => {
        beforeEach(() => {
          const newProps = {
            ...props,
            location: { search: '?q=bitcoin', state: { from: '', to: '', source: '', sorting: 'publishedAt'} }
          };
          wrapper.setProps({...newProps});
        });

        it('should not search articles', () => {
          // console.log(mockSearchfn.mock.calls[0][0].options);
          expect(mockSearchfn.mock.calls.length).toBe(1);
        });
      });

      describe('when options !== previous options', () => {
        beforeEach(() => {
          const newProps = {
            ...props,
            location: { search: '?q=bitcoin', state: { from: '30-01-1992', to: '20-09-2018', source: 'le-monde', sorting: 'relevancy'} }
          };
          wrapper.setProps({...newProps});
        });

        it('should search articles', () => {
          // console.log(mockSearchfn.mock.calls[0][0].options);
          // console.log(mockSearchfn.mock.calls[1][0].options);
          expect(mockSearchfn.mock.calls.length).toBe(2);
        });
      });
    });
  });


  // describe('When the form is submitted with no query', () => {

  //   it('should not call the mockSearch function on mounting', () => {
  //     const wrapper = shallow(<Search {...props} />);
  //     wrapper.find('.header').simulate(
  //       'submit',
  //       {preventDefault() {}}
  //     );
  //     expect(mockSearchfn.mock.calls.length).toBe(0);
  //   });

  //   it('should not call the mockSearch function on update', () => {
  //     const wrapper = shallow(<Search {...props} />);
  //     // wrapper.find('.header').simulate(
  //     //   'submit',
  //     //   {preventDefault() {}}
  //     // );
  //     wrapper.setProps({...props});
  //     expect(mockSearchfn.mock.calls.length).toBe(0);
  //   });
  // });

  // describe('When the form is submitted with query', () => {
  //   let newProps;
  //   beforeEach(() => {
  //     newProps = {
  //       ...props,
  //       location: {
  //         search: '?q=bitcoin'
  //       }
  //     }
  //   });

  //   it('should call the mockSearch function', () => {
  //     const wrapper = shallow(<Search {...newProps} />);
  //     wrapper.find('.header').simulate(
  //       'submit',
  //       {preventDefault() {}}
  //     );
  //     expect(mockSearchfn.mock.calls.length).toBe(1);
  //   });
  // });
});

