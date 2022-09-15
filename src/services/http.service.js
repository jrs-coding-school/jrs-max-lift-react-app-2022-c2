import axios from 'axios';


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

function signup({ username, password, age, weight, height, sex }) {
    return axios.post(`${URL}/users`, { username, password, age, height, weight, sex })
}

function postNewPr(userId, exerciseId, maxWeight, date) {
    return axios.post(`${URL}/orms`, {
        userId,
        exerciseId,
        maxWeight,
        date
    });
}

function updateOrm(id, maxWeight) {
    return axios.put(`${URL}/orms/`, {
        id,
        maxWeight
    });
}

function deletePr(id) {
    console.log(id, typeof id)
    return axios.delete(`${URL}/orms/${id}`);
}


export default {
    getUsersFullHistory,
    getAllPrs,
    getPrForOneExercise,
    getExerciseHistory,
    login,
    postNewPr,
    updateOrm,
    deletePr,
    signup
};