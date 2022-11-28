import axios from 'axios';

const BASE_URL = 'https://easy-pear-lamb-gown.cyclic.app/api'

exports.getAllUsers = async () => {

    const { data } = await axios.get(`${BASE_URL}/users`);
    return data;
};

exports.saveAllMoney = async (payload) => {
    const { data } = await axios.post(`${BASE_URL}/users/money/all`, payload);
    return data;
}
