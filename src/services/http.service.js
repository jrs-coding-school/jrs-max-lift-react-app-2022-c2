import axios from 'axios';

// const axios = require('axios').default;
const DOMAIN = 'localhost:8080'
const URL = `http://${DOMAIN}/api`;


function getUsersFullHistory(user_id) {
    return axios.get(`${URL}/orms/user/${user_id}`)
}

function getAllPrs(user_id) {
    return axios.get(`${URL}/orms/user/${user_id}/recent`)
}

function getPrForOneExercise(user_id, exercise_id) {
    return axios.get(`${URL}/orms/user/${user_id}/recent/${exercise_id}`)
}

function getExerciseHistory(user_id, exercise_id) {
    return axios.get(`${URL}/orms/user/${user_id}/exercise/${exercise_id}`)
}

function login({ username, password }) {
    return axios.post(`${URL}/users/login`, { username, password });
}

export default {
    getUsersFullHistory,
    getAllPrs,
    getPrForOneExercise,
    getExerciseHistory,
    login
};