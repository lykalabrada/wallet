import { StackActions, useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Logging } from '../../../../../api'
import { MnemonicEncrypted } from '../../../../../api/wallet'
import { MnemonicStorage } from '../../../../../api/wallet/mnemonic_storage'
import { View } from '../../../../../components'
import { PinTextInput } from '../../../../../components/PinTextInput'
import { ThemedActivityIndicator, ThemedScrollView, ThemedText } from '../../../../../components/themed'
import { useNetworkContext } from '../../../../../contexts/NetworkContext'
import { useWalletPersistenceContext } from '../../../../../contexts/WalletPersistenceContext'
import { tailwind } from '../../../../../tailwind'
import { translate } from '../../../../../translations'
import { SettingsParamList } from '../SettingsNavigator'

type Props = StackScreenProps<SettingsParamList, 'ConfirmPinScreen'>

export function ConfirmPinScreen ({ route }: Props): JSX.Element {
  const navigation = useNavigation()
  const { network } = useNetworkContext()
  const { setWallet } = useWalletPersistenceContext()
  const { pin, words } = route.params

  const [newPin, setNewPin] = useState('')
  const [invalid, setInvalid] = useState<boolean>(false)
  const [spinnerMessage, setSpinnerMessage] = useState<string>()

  function verifyPin (input: string): void {
    if (input.length !== pin.length) return
    if (input !== pin) {
      setNewPin('')
      setInvalid(true)
      return
    } else {
      setInvalid(false)
    }

    const copy = { words, network, pin }
    setSpinnerMessage(translate('screens/PinConfirmation', 'It may take a few seconds to securely encrypt your wallet...'))
    setTimeout(() => {
      MnemonicEncrypted.toData(copy.words, copy.network, copy.pin)
        .then(async encrypted => {
          await MnemonicStorage.set(words, pin)
          await setWallet(encrypted)
          navigation.dispatch(StackActions.popToTop())
        })
        .catch(e => Logging.error(e))
    }, 50) // allow UI render the spinner before async task
  }

  return (
    <ThemedScrollView
      light={tailwind('bg-white')} dark={tailwind('bg-gray-900')}
      style={tailwind('w-full flex-1 flex-col')}
    >
      <View style={tailwind('px-6 py-4 mb-6 mt-8')}>
        <ThemedText
          style={tailwind('text-center font-semibold')}
        >{translate('screens/PinConfirmation', 'Enter your passcode again to verify')}
        </ThemedText>
      </View>
      <PinTextInput
        cellCount={6} testID='pin_confirm_input' value={newPin} onChange={(pin) => {
          setNewPin(pin)
          verifyPin(pin)
        }}
      />
      <View style={tailwind('flex-row justify-center mt-6')}>
        {
          (spinnerMessage !== undefined)
            ? (
              <View style={tailwind('items-center px-4')}>
                <ThemedActivityIndicator style={tailwind('mb-4')} />
                <ThemedText
                  style={tailwind('ml-2 font-semibold text-sm text-center w-4/6 px-4')}
                >{spinnerMessage}
                </ThemedText>
              </View>
              )
            : null
        }
        {
          invalid && (
            <ThemedText
              testID='wrong_passcode_text' light={tailwind('text-error-500')} dark={tailwind('text-darkerror-500')}
              style={tailwind('text-center font-semibold text-sm')}
            >
              {translate('screens/PinConfirmation', 'Wrong passcode entered')}
            </ThemedText>
          )
        }
      </View>
    </ThemedScrollView>
  )
}
