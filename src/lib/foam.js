import { shuffle } from "./helper";

export const quizTypes = [
    {
        id: "foamVolume",
        name: "Schaumvolumen",
        calcFunc: calculateFoamVolume,
        answerUnit: "Liter Schaum"
    },
    {
        id: "agentVolume",
        name: "Schaummittelmenge",
        calcFunc: calculateAgentVolume,
        answerUnit: "Liter Schaummittel"
    },
    {
        id: "time",
        name: "Zeitberechnung",
        calcFunc: calculateTime,
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

export function generateQuestions() {
    /**
     * @type {any[]}
     */
    let questions = [];
    const times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for(let type of quizTypes) {
        for(let mixer of mixers) {
            for(let nozzle of nozzles) {
                if(nozzle.flowRate !== mixer.flowRate) continue;
                for(let time of times) {
                    for(let mixingRate of mixingRates) {
                        let question = {
                            type: type,
                            mixer: {
                                ...mixer,
                                mixingRate: mixingRate
                            },
                            nozzle: nozzle,
                            time: time,
                            agentAmount: 0,
                            answer: ""
                        };
                        if(type.id === "time") {
                            question.agentAmount = Number(calculateAgentVolume(question).toPrecision(2))
                        }
                        if(type.id === "foamVolume") {
                            question.mixer.mixingRate = shuffle(mixingRates)[0];
                        }
                        question.answer = Number(question.type.calcFunc(question).toPrecision(2)).toString();
                        questions = [...questions, question];
                        if(type.id === "foamVolume") {
                            break;
                        }
                    }
                }
            }
        }
    }
    return shuffle(questions);
}

/**
 * @param {{ mixer:{ mixingRate: number; flowRate: number }, nozzle: { flowRate: number; foamRatio: number; }; time: number; }} data
 */
export function calculateFoamVolume(data) {
    return data.nozzle?.flowRate * data?.nozzle?.foamRatio * data.time;
}

/**
 * @param {{ mixer:{ mixingRate: number; flowRate: number }, nozzle: { flowRate: number; foamRatio: number; }; time: number; }} data
 */
export function calculateAgentVolume(data) {
    return data.nozzle?.flowRate * (data.mixer?.mixingRate / 100) * data.time;
}

/**
 * @param {{ mixer:{ mixingRate: number; flowRate: number }, nozzle: { flowRate: number; foamRatio: number; }; time: number; agentAmount: number}} data
 */
export function calculateTime(data) {
    return data.agentAmount / (data.mixer.flowRate * (data.mixer?.mixingRate / 100));
}