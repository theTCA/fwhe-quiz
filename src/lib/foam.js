import { shuffle } from "./helper";

export const quizTypes = [
    {
        id: "foamVolume",
        name: "Schaumvolumen",
        answerUnit: "Liter Schaum"
    },
    {
        id: "agentVolume",
        name: "Schaummittelmenge",
        answerUnit: "Liter Schaummittel"
    },
    {
        id: "time",
        name: "Zeitberechnung",
        answerUnit: "Minuten"
    }
];

const mixers = [
    {
        type: "Z2",
        flowRate: 200
    },
    {
        type: "Z4",
        flowRate: 400
    },
    {
        type: "Z8",
        flowRate: 800
    }
];

const nozzles = [
    {
        type: "S2",
        flowRate: 200,
        foamRatio: 15
    },
    {
        type: "S4",
        flowRate: 400,
        foamRatio: 15
    },
    {
        type: "S8",
        flowRate: 800,
        foamRatio: 15
    },
    {
        type: "M2",
        flowRate: 200,
        foamRatio: 150
    },
    {
        type: "M4",
        flowRate: 400,
        foamRatio: 150
    },
    {
        type: "M8",
        flowRate: 800,
        foamRatio: 150
    }
];

const mixingRates = [0.1, 0.5, 1, 2, 3, 4, 5, 6];
const times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function generateQuestions() {
    return [...generateFoamVolumeQuestions(), ...generateAgentVolumeQuestions(),...generateTimeQuestions()];
}

function generateFoamVolumeQuestions() {
    /**
     * @type {any[]}
     */
    let questions = [];
    for(let mixer of mixers) {
        for(let nozzle of nozzles) {
            if(nozzle.flowRate !== mixer.flowRate) continue;
            for(let time of times) {
                let question = {
                    type: quizTypes[0],
                    mixer: {
                        ...mixer,
                        mixingRate: shuffle(mixingRates)[0]
                    },
                    nozzle: nozzle,
                    time: time,
                    answer: ""
                }
                question.answer = calculateFoamVolume(question).toString();
                questions = [...questions, question];
            }
        }
    }
    return questions;
}

function generateAgentVolumeQuestions() {
    /**
     * @type {any[]}
     */
    let questions = [];
    for(let mixer of mixers) {
        for(let nozzle of nozzles) {
            if(nozzle.flowRate !== mixer.flowRate) continue;
            for(let time of times) {
                for(let mixingRate of mixingRates) {
                    let question = {
                        type: quizTypes[1],
                        mixer: {
                            ...mixer,
                            mixingRate: mixingRate
                        },
                        nozzle: nozzle,
                        time: time,
                        answer: ""
                    }
                    question.answer = calculateAgentVolume(question).toString();
                    questions = [...questions, question];
                }
            }
        }
    }
    return questions;
}

function generateTimeQuestions() {
    /**
     * @type {any[]}
     */
    let questions = [];
    for(let mixer of mixers) {
        for(let nozzle of nozzles) {
            if(nozzle.flowRate !== mixer.flowRate) continue;
            for(let time of times) {
                for(let mixingRate of mixingRates) {
                    let question = {
                        type: quizTypes[2],
                        mixer: {
                            ...mixer,
                            mixingRate: mixingRate
                        },
                        nozzle: nozzle,
                        time: time,
                        agentAmount: 0,
                        answer: time.toString()
                    }
                    question.agentAmount = calculateAgentVolume(question)
                    questions = [...questions, question];
                }
            }
        }
    }
    return questions;
}

/**
 * @param {{ mixer:{ mixingRate: number; flowRate: number }, nozzle: { flowRate: number; foamRatio: number; }; time: number; }} data
 */
export function calculateFoamVolume(data) {
    return data.nozzle.flowRate * data.nozzle.foamRatio * data.time;
}

/**
 * @param {{ mixer:{ mixingRate: number; flowRate: number }, nozzle: { flowRate: number; foamRatio: number; }; time: number; }} data
 */
export function calculateAgentVolume(data) {
    return (data.mixer.flowRate * data.mixer.mixingRate * data.time) / 100;
}

/**
 * @param {{ mixer:{ mixingRate: number; flowRate: number }, nozzle: { flowRate: number; foamRatio: number; }; time: number; agentAmount: number}} data
 */
export function calculateTime(data) {
    return data.agentAmount / (data.mixer.flowRate * data.mixer.mixingRate / 100);
}