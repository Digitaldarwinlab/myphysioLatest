import { shallow} from 'enzyme';
// import Validation from './../components/Validation/index';
import FormInput from './../components/UI/antInputs/FormInput';

describe("<Add Episode /> Component Field Testing",()=>{
    it("check referring doctor field is Empty",()=>{
        //1. Arrange
        const testState = {doctor:""};
        const wrapper = shallow((
            <FormInput 
                label="Referring Doctor" 
                placeholder="Note"  
                name="doctor"
                value={testState.doctor}
                onChange = {(e,value)=>{
                    testState[e] = value;
                }}
                onBlur = {(e)=>{
                    if(e.target.value === ""){
                        testState["error"] = "Referred Doctor name must be filled."
                    }
                }}
                required={true}
            />
        )); 
        //2. Act 
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:""}});
        input.simulate("blur",{target:{value:""}});
        //3. Assertion
        expect(testState.doctor).toBe("");
        expect(testState.error).toBe("Referred Doctor name must be filled.");
    });

    it("check referring doctor field is not Empty",()=>{
        //1. Arrange
        const testState = {doctor:""};
        const wrapper = shallow((
            <FormInput 
                label="Referring Doctor" 
                placeholder="Note"  
                name="doctor"
                value={testState.doctor}
                onChange = {(e,value)=>{
                    testState[e] = value;
                }}
                onBlur = {(e)=>{
                    if(e.target.value === ""){
                        testState["error"] = "Referred Doctor name must be filled."
                    }
                }}
                required={true}
            />
        )); 
        //2. Act 
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:"Pawan Kumar"}});
        input.simulate("blur",{target:{value:"Pawan Kumar"}});
        //3. Assertion
        expect(testState.doctor).toBe("Pawan Kumar");
        expect(testState.error).toBe(undefined);
    })
})