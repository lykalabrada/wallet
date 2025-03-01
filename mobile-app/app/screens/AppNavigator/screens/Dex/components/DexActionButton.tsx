import { tailwind } from '@tailwind'
import { ThemedIcon, ThemedTextV2, ThemedTouchableOpacityV2, ThemedViewV2 } from '@components/themed'
import { ViewStyle, StyleProp } from 'react-native'

interface DexActionButtonProps {
  label: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
  testID: string
}

export function DexActionButton ({ label, onPress, style, testID }: DexActionButtonProps): JSX.Element {
  return (
    <ThemedTouchableOpacityV2
      style={[tailwind('rounded-2xl-v2 py-2 px-4'), style]}
      dark={tailwind('bg-mono-dark-v2-100')}
      light={tailwind('bg-mono-light-v2-100')}
      onPress={onPress}
    >
      <ThemedTextV2
        light={tailwind('text-mono-light-v2-900')}
        dark={tailwind('text-mono-dark-v2-900')}
        style={tailwind('font-semibold-v2 text-sm text-center')}
        testID={testID}
      >
        {label}
      </ThemedTextV2>
    </ThemedTouchableOpacityV2>
  )
}

interface DexAddRemoveLiquidityButtonProps {
  style?: StyleProp<ViewStyle>
  onAdd: () => void
  onRemove: () => void
  pairToken: string
}

export function DexAddRemoveLiquidityButton ({ style, onAdd, onRemove, pairToken }: DexAddRemoveLiquidityButtonProps): JSX.Element {
  return (
    <ThemedViewV2
      style={[tailwind('rounded-2xl-v2 py-2 px-3 flex flex-row items-center'), style]}
      dark={tailwind('bg-mono-dark-v2-100')}
      light={tailwind('bg-mono-light-v2-100')}

    >
      <ThemedTouchableOpacityV2
        onPress={onRemove}
        style={tailwind('border-r-0.5 pr-2')}
        testID={`pool_pair_remove_${pairToken}`}
      >
        <ThemedIcon
          iconType='Feather'
          name='minus-circle'
          size={20}
          dark={tailwind('text-mono-dark-v2-900')}
          light={tailwind('text-mono-light-v2-900')}
        />
      </ThemedTouchableOpacityV2>
      <ThemedTouchableOpacityV2
        onPress={onAdd}
        style={tailwind('pl-2')}
        testID={`pool_pair_add_${pairToken}`}
      >
        <ThemedIcon
          iconType='Feather'
          name='plus-circle'
          size={20}
          dark={tailwind('text-mono-dark-v2-900')}
          light={tailwind('text-mono-light-v2-900')}
        />
      </ThemedTouchableOpacityV2>
    </ThemedViewV2>
  )
}
