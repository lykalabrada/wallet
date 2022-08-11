import { render } from '@testing-library/react-native'
import { FavoriteButton } from './FavoriteButton'

jest.mock('@shared-contexts/ThemeProvider')
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn()
}))

describe('Favorite Button', () => {
  it('should match snapshot', () => {
    const rendered = render(<FavoriteButton pairId='1' />)
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})
