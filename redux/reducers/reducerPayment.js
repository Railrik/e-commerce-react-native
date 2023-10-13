import moment from "moment";
import Payment from "../../data/paymentModel";
import { ADD_PAYMENT } from "../constants";

const initialState = {
    payments: []
};

const reducerPayment = (state = initialState, action) => {

    switch (action.type) {
        case ADD_PAYMENT:
            const newPayment = new Payment(
                Date.now().toString(),
                action.orderInfos.courses,
                action.orderInfos.total,
                moment(new Date()).format("DD MM YYYY hh:mm")
            );

            const serializedNewPayment = JSON.stringify(newPayment);

            return {
                ...state,
                payments: state.payments.concat(serializedNewPayment)
            }

        default:
            return state;
    }
}

export default reducerPayment;