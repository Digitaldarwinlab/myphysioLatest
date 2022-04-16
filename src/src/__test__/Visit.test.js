import { shallow,mount} from 'enzyme';
import Validation from './../components/Validation/index';
import FormInput from './../components/UI/antInputs/FormInput';
import SchduleForm from './../components/UtilityComponents/SchduleForm';

const state = {
    start_date:"",
    end_date:"",
    type:"",
    status:"",
    location:"",
    reason:"",
    isLoading:false,
    success:""
}
it("Adding 2 and 2",()=>{
    expect(2+2).toBe(4);
})
// describe('"<Add Visit />" Field Testing', () => {
//     it("Check Location is not Empty",()=>{
//         //1. arrange 
//         const wrapper = mount((
//             <SchduleForm 
//                 state = {state}
//                 episode = {false}
//                 handleSubmit={(values)=>{console.log(values)}} 
//                 handleChange={(e,value)=>{
//                     state[e] = value
//                 }} 
//                 handleBlur={(e)=>{
//                     console.log(e)
//                 }} 
//                 startDateState=""
//                 endDateState="" 
//             />
//         ));

//         //2. Act 
//         const locationSelect = wrapper.find("Select");
//         locationSelect.simulate('change',{target:{value:""}});
//         locationSelect.simulate('blur',{target:{value:""}});
//         //3. assertion 
//         expect(state.location).toBe("");
//     })
// })
