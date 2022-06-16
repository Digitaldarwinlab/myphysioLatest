import {Provider,useSelector,useDispatch} from "react-redux";
import {shallow} from "enzyme";
import PatientConsuntForm from './../components/patientEpisode/PatientConsuntForm';
import store from './../contextStore/store';

describe("Pateint Consent Component",()=>{
    it("Test Patient Consent Component Rendering",()=>{
        //1. Arrange
        const wrapper = shallow((
            <Provider store={store}>
                <PatientConsuntForm />
            </Provider>
        ));
        const paragraph = <p>Dear Patient,</p> 
        //2. Act
        // ... 
        //3. assertion
        expect(wrapper.contains(<PatientConsuntForm/>)).toEqual(true);
    })
})