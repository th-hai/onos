import axios from 'axios';

const BASE_URL = 'https://onos-server.onrender.com/api'

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

export async function getMonthlyTransactions() {

    const { data } = await axios.get(`${BASE_URL}/transaction-monthly`);
    return data;
};
