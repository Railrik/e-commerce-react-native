import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import EmptyItem from '../components/EmptyItem';
import PaidItems from '../components/PaidItems';

const PaymentsHistory = () => {

    const payments = useSelector(state => state.payments.payments);

    const parsedPayments = payments.map(state => JSON.parse(state));
    if (payments.length > 0) {
        return (
            <FlatList
                data={parsedPayments}
                renderItem={({ item }) => (
                    <PaidItems
                        totalPrice={item.total}
                        date={item.date}
                        courseDetails={item}
                    ></PaidItems>
                )}
            />
        )
    }
    return <EmptyItem text="Pas d'achats'" />
}

export default PaymentsHistory

const styles = StyleSheet.create({})