import axios from 'axios';

const BASE_URL = 'https://easy-pear-lamb-gown.cyclic.app/api'

export async function getAllUsers() {

    const { data } = await axios.get(`${BASE_URL}/users`);
    return data;
};

export async function saveAllMoney(payload) {
    const { data } = await axios.post(`${BASE_URL}/users/money/all`, payload);
    return data;
}

export async function getAllTransactions() {

    const { data } = await axios.get(`${BASE_URL}/transactions`);
    return data;
};