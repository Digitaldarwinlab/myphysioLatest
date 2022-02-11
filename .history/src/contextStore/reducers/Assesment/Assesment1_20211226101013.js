import {
    STATECHANGE,
    STATE_ARRAY_CHANGE,
    FETCH_DATA,
    RECEIVED_DATA,
    ASSESMENT_CLEARSTATE,
    ASSESSMENT_ADD_SUB_INPUT,
    ASSESSMENT_REMOVE_SUB_INPUT,
} from "../../actions/Assesment"


const FirstAssesmentIniState ={
    Date:"",
    AI_data:"",
    AI_screenshot:"",
    Exercise_Name:"",
    episode_id:"",
    Complaint:"",
    EspiStart:"",
    joint1score:10,
    joint2score:20,
    ScareFile:[],
    TraumaFile:"",
    // aswin 10/24/2021 start
    Type:"First",
    // aswin 10/24/2021 stop
    Scars:"",

    // gaurav
    chiefCom:"",
    occupation:"",
    Duration:"",
    Built:"",
    History:"",
    Medication:'',
    Others:'',
    medicCheck:false,
    othCheck:false,
    past_medical_history:[],
//     Diabetes:"false",
//     HYN: "false",
//     COPD: "false",
//     Cardiac: "false",
//     Medication: "false",
//     Other: "false",
// ],



    // 
    Swelling:"no pain",
    pain_scars:"",
    subjective:[{
        occupation:'',
        duration
    }],
    pain_swelling:"",
    Numbness:"no pain",
    pain_state:false,
    PainMeter:0,
    RecentHistory:"",
    Trauma:"",
    Test:"",
    nature_of_pain_here:"",
    pain_aggravating_here:[],
    pain_relieving_here:[],
    nature_of_pain:{},
    pain_scale:1,
    pain_aggravating:{},
    pain_relieving:{},
    superficial:'',
    deep:'',
    cortial:'',
    Symptoms:{score:[],question:[],answer:[]},
    Stiffness:{score:[],question:[],answer:[]},
    pain:{score:[],question:[],answer:[]},
    DailyLiving:{score:[],question:[],answer:[]},
    Sports:{score:[],question:[],answer:[]},
    Life:{score:[],question:[],answer:[]},
    KOOS:"",
    Questionnaire:"",
    success:"",
}

const handleIndexValue = (arr,value,index,ques,ans) => {
    const newArr = {...arr};
    if(index+1>newArr.length){
        newArr.score.push(value)
    }else{
        newArr.score[index] = value;
    }
    newArr.question.push(ques)
    newArr.answer.push(ans)
    return newArr;
}
const Addsubjective = (list) => {
    if (list.length === 0) {
        return [{
           
        ]
    } else {
        let newEntry = {
            id: list[list.length - 1].id + 1,
            medication: "",
            no_of_medications:1,
            instructions: "",
            medic_notes: ""
        }
        let newList = [...list, newEntry];
        return newList
    }
}
const Removesubjective = (list) => {
    list.pop();
    return list;
}
export const FirstAssesment =( state=FirstAssesmentIniState , action) => {
    switch(action.type){
        case STATECHANGE: 
            return{ 
                ...state, 
                isLoading:false,
                success:"",
                [action.payload.key]:action.payload.value
            }
        case STATE_ARRAY_CHANGE: 
            return {
                ...state,
                isLoading:false,
                success:"",
                [action.payload.key]:handleIndexValue(
                    state[action.payload.key],
                    action.payload.value,
                    action.payload.index,
                    action.payload.ques,
                    action.payload.ans)
                }   
        case FETCH_DATA:
            return{
                ...state,
                isLoading:true,
                success:""
            }
        case RECEIVED_DATA:
            return{
                ...state, 
                isLoading:true,
                success:"Assesment Added"
            }
         case ASSESSMENT_ADD_SUB_INPUT:
            if (action.payload.type === "medication") {
                return {
                    ...state,
                    medicationList: AddMedication(state.medicationList)
                }
            } else {
                return {
                    ...state,
                    labsList: AddLabs(state.labsList)
                }
            }
        case ASSESSMENT_REMOVE_SUB_INPUT:
            if (action.payload.type === "medication") {
                return {
                    ...state,
                    medicationList: RemoveMedication(state.medicationList)
                }
            }
            else {
                return {
                    ...state,
                    labsList: RemoveLabs(state.labsList)
                }
            }    
        case ASSESMENT_CLEARSTATE:
            return {
                ...FirstAssesmentIniState
            }
        case "PAIN_ASSESMENT_CLEARSTATE":
            return {
                ...state,
                nature_of_pain:{},
                pain_scale:1,
                pain_aggravating:{},
                pain_relieving:{},
                superficial:'',
                deep:'',
                cortial:'',
            }    
        case "SPECIAL_TEST_CLEARSTATE":
            return {
                ...state
            }    
        default:
            return state;
    }
}