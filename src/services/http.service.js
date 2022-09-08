const DOMAIN = 'localhost:8080'
const URL = `http://${DOMAIN}/api`;


function getUsersFullHistory(user_id) {
    return `${URL}/orms/user/${user_id}`
}

function getAllPrs(user_id) {
    return `${URL}/orms/user/${user_id}/recent`
}

function getPrForOneExercise(user_id, exercise_id) {
    return `${URL}/orms/user/${user_id}/recent/${exercise_id}`
}

function getExerciseHistory(user_id, exercise_id) {
    return `${URL}/orms/user/${user_id}/exercise/${exercise_id}`
}

export default {
    getUsersFullHistory,
    getAllPrs,
    getPrForOneExercise,
    getExerciseHistory
};