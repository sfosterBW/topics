import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { TopicsProvider } from '../Hooks/useTopics'

const customRender = (ui, { value = {}, ...options } = {}) => {
  const Wrapper = (props) => {
    return <TopicsProvider value={value} {...props} />
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'

export { customRender as render }
