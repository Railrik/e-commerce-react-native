import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles/globalStyles'

const EmptyItem = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default EmptyItem

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center"
    },
    text: {
        color: globalStyles.green
    }
})