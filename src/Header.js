import React, {Fragment} from 'react';
import {Image, Text} from 'react-native'
import {tailwind} from '../tailwind'

const Header = ({title}) => {
    return (
        <Fragment>
            <Image
                style={{width: 350, height: 150}}
                source={require('../assets/logo.png')}
            />
            <Text style={tailwind('mt-3 text-3xl leading-9 font-bold text-gray-900')}>{title}</Text>
        </Fragment>
    )
}

export default Header
