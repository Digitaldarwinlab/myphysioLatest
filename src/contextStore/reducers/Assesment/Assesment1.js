import {
    STATECHANGE,
    STATE_ARRAY_CHANGE,
    FETCH_DATA,
    RECEIVED_DATA,
    ASSESMENT_CLEARSTATE,
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
    ScareFile:"",
    TraumaFile:"",
    Type:"",
    Scars:"",
    Swelling:"",
    Numbness:"",
    PainMeter:"",
    RecentHistory:"",
    Trauma:"",
    Test:"",
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
        case ASSESMENT_CLEARSTATE:
            return {
                ...FirstAssesmentIniState
            }
        default:
            return state;
    }
}