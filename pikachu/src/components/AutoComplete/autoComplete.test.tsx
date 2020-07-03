import React from 'react'
import AutoComplete, { AutoCompleteProps } from './autoComplete'
import { RenderResult, render, fireEvent, wait } from '@testing-library/react'
const testArray = [
  { value: 'a', number: 1 },
  { value: 'ab', number: 2 },
  { value: 'abc', number: 3 },
  { value: 'abcd', number: 4 }
]

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

let wrapper: RenderResult, inputNode: HTMLInputElement

describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // shhould have four suggestion items
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(4)
    // click the first item
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 2 })
    await wait(() => {
      expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })
    // fill the input
    expect(inputNode.value).toBe('ab')
  })
  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.queryByText('a')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('a')
    const secondResult = wrapper.queryByText('ab')

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstResult).toHaveClass('is-active')
    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondResult).toHaveClass('is-active')
    // arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firstResult).toHaveClass('is-active')
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'a', number: 1 })
    await wait(() => {
      expect(wrapper.queryByText('a')).not.toBeInTheDocument()
    })
  })
  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.queryByText('a')).toBeInTheDocument()
    })

    fireEvent.click(document)
    await wait(() => {
      expect(wrapper.queryByText('a')).not.toBeInTheDocument()
    })
  })
  it('renderOption should generate the right template', () => {

  })
  it('async fetchSuggestions shoud works fine', () => {

  })
})
