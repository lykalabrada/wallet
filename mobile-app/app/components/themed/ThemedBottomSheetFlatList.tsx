import { forwardRef } from 'react'
import { useThemeContext } from '@shared-contexts/ThemeProvider'
import { tailwind } from '@tailwind'

import { ThemedProps } from './index'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { BottomSheetFlatListProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types'

type ThemedFlatListProps = BottomSheetFlatListProps<any> & ThemedProps

export const ThemedBottomSheetFlatList = forwardRef(function (props: ThemedFlatListProps, ref: React.Ref<any>): JSX.Element {
  const { isLight } = useThemeContext()
  const {
    style,
    light = tailwind('bg-mono-light-v2-100'),
    dark = tailwind('bg-mono-dark-v2-100'),
    ...otherProps
  } = props

  return (
    <BottomSheetFlatList
      style={[style, isLight ? light : dark]}
      ref={ref}
      {...otherProps}
    />
  )
})
