import { tailwind } from '@tailwind'
import { ThemedTextV2 } from '@components/themed'
import { View } from '@components'
import { StyleProp, ViewStyle } from 'react-native'
interface EmptyBalancesProps {
  icon: () => JSX.Element
  title: string
  subTitle: string
  containerStyle?: StyleProp<ViewStyle>
}

export function EmptyTokensScreen (props: EmptyBalancesProps): JSX.Element {
  const { icon: Icon, title, subTitle, containerStyle } = props
  return (
    <View
      style={[tailwind('flex px-15 mt-8 mb-4 text-center bg-transparent'), containerStyle]}
      testID='empty_portfolio'
    >
      <View style={tailwind('items-center mt-3')}>
        <Icon />
      </View>
      <ThemedTextV2
        testID='empty_tokens_title'
        style={tailwind('text-xl font-semibold-v2 text-center mt-8')}
      >
        {title}
      </ThemedTextV2>
      <ThemedTextV2
        testID='empty_tokens_subtitle'
        style={tailwind('text-base font-normal-v2 text-center mt-2')}
      >
        {subTitle}
      </ThemedTextV2>
    </View>
  )
}
