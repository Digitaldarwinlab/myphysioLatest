import {
    STATECHANGE,
    STATE_ARRAY_CHANGE,
    FETCH_DATA,
    RECEIVED_DATA,
    ASSESMENT_CLEARSTATE,
    ASSESSMENT_ADD_SUB_INPUT,
    ASSESSMENT_REMOVE_SUB_INPUT,
    ASSESSMENT_SUBJECTIVE,
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
        id:1,
        occupation:'',
        duration:''
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
            id:1,
            occupation:'',
            duration:''
        }]
    } else {
        let newEntry = {
            
            occupation:'',
            duration:''
        }
        let newList = [...list, newEntry];
        return newList
    }
}
const Removesubjective = (list) => {
    list.pop();
   
    return list;
}
const getNewLabList = (list, key, value, id) => {
    let newList = [...list];
    newList[id][key] = value;
    return newList;
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
                return {
                    ...state,
                    subjective : Addsubjective(state.subjective)
                }
        case ASSESSMENT_REMOVE_SUB_INPUT:
                return {
                    ...state,
                    subjective : Removesubjective(state.subjective)
                } 
        case ASSESSMENT_SUBJECTIVE: {
            return {
                ...state,
                labsList: getNewLabList(state.subjective, action.payload.key, action.payload.value, action.payload.id)
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