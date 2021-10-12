import {shallow} from "enzyme";
// import {Provider,useSelector,useDispatch} from "react-redux";
// import store from '../contextStore/store';
// import { BrowserRouter as Router} from "react-router-dom";
import Validation from "../components/Validation/authValidation/authValidation";
import FormInput from '../components/UI/antInputs/FormInput';
// import Item from "antd/lib/list/Item";

describe("Patient Registration form Input Field testing",()=>{
    it("Check name should not be empty and not undefined",()=>{
        const testState = {FirstName:""};
        const wrapper = shallow(( 
            <FormInput
                name="FirstName" 
                label="First Name"
                className="input-field w-100"
                value = {testState.FirstName} 
                onChange={(e,value)=>{
                    testState[e] = value
                }} 
                onBlur = {(e)=>{
                    const error = Validation.checkNameValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                        testState["name"] = ""
                    }
                }}
                placeholder="Enter your First Name"
                required={true}
            />
        ))
        //2 Act
        const input = wrapper.find("Input");
        input.simulate('change',{target:{value:"Hello"}});
        input.simulate('blur',{target:{value:"Hello"}});
        //3. Assert
        expect(testState.FirstName).not.toEqual("");
        expect(testState.FirstName).not.toEqual(undefined);
        expect(testState.error).toEqual(undefined);
    });

    it("check name should not contain any Special Character",() => {
        //1. Arrange 
        const testState = {name:""};
        const wrapper = shallow( 
            <FormInput
                name="First Name" 
                label="FirstName"
                className="input-field w-100"
                value = {testState.name}
                onChange={(e,value)=>{
                    testState[e] = value
                }} 
                onBlur = {(e)=>{
                    const error = Validation.checkNameValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                        testState["name"] = ""
                    }
                }}
                placeholder="Enter your First Name"
                required={true}
            />
        )
        //2 Act
        const input = wrapper.find("Input");
        input.simulate('change',{target:{value:"@Hello"}});
        input.simulate('blur',{target:{value:"@Hello"}});
        //3. Assert
        expect(testState.name).toEqual("");
        expect(testState.error).not.toEqual(undefined);
    });

    it("Check Email should not be empty and undefined",() => {
        //1 Arrange
        const testState = {email:""};
        const wrapper = shallow((
            <FormInput
                name="Email" 
                label="Email"
                className="input-field w-100"
                value = {testState.Email}
                onChange={(e,value)=>{
                    testState[e] = value
                }} 
                onBlur = {(e)=>{
                    const error = Validation.checkEmailValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                        testState["email"] = ""
                    }
                }}
                
                required={true}
            />
        ));
        
        //2. Act 
        const input = wrapper.find("Input");
        input.simulate('change',{target:{value:""}});
        input.simulate('blur',{target:{value:""}});

        //3 assertion
        expect(testState.error).not.toEqual(undefined);
    })

    it("Check Email should be Valid",()=>{
        //1. Arrange
        const testState = {email:""};
        const wrapper = shallow((
            <FormInput
                name="email" 
                label="Email"
                className="formInput"
                value = {testState.email}
                onChange={(e,value)=>{
                    testState[e] = value
                }} 
                onBlur = {(e)=>{
                    const error = Validation.checkEmailValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                        testState["email"] = ""
                    }
                }}
                placeholder="Email"
                required={true}
            />
        ));

        //2. Act 
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:"mohammed@gmail.com"}});
        input.simulate("blur",{target:{value:"mohammed@gmail.com"}});

        //3. Assertion
        expect(testState.email).toEqual("mohammed@gmail.com");
        expect(testState.error).toEqual(undefined);
    });

    it("PinCode  is empty",()=>{
        //1. Arrange
        const testState = {Pincode:""};
        const wrapper = shallow((
        <FormInput 
            name="Pincode" 
            label="Pincode"
            className="input-field w-100"
            value = {testState.Pincode}
            onChange={(e,value)=>{
                testState[e] = value
            }} 
            onBlur = {(e)=>{
                const error = Validation.checkPincodeValidation(e.target.value);
                if(error.error){
                    testState["error"] = error.error;
                    testState["Pincode"] = "";
                }
            }}
            required={true}
            />
        ));
    
        //2. Act
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:""}});
        input.simulate("blur",{target:{value:""}});
        //3. assertion
        expect(testState.Pincode).toEqual("");
        expect(testState.error).not.toEqual(undefined);
    });


    it("PinCode is not empty, but Invalid",()=>{
        //1. Arrange
        const testState = {Pincode:""};
        const wrapper = shallow((
        <FormInput 
            name="Pincode" 
            label="Pincode"
            className="input-field w-100"
            value = {testState.Pincode}
            onChange={(e,value)=>{
                testState[e] = value
            }} 
            onBlur = {(e)=>{
                const error = Validation.checkPincodeValidation(e.target.value);
                if(error.error){
                    testState["error"] = error.error;
                    // testState["Pincode"] = "";
                }
            }}
           
            required={true}
            />
        ));
    
        //2. Act
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:"3456789"}});
        input.simulate("blur",{target:{value:"3456789"}});
        //3. assertion
        expect(testState.Pincode).toEqual("3456789");
        expect(testState.error).toEqual("Invalid Pincode"); 
    });

    it(" Pin Code is not empty, but Valid",()=>{
        //1. Arrange
        const testState = {Pincode:""};
        const wrapper = shallow((
        <FormInput 
            name="Pincode" 
            label="Pincode"
            className="input-field w-100"
            value = {testState.Pincode}
            onChange={(e,value)=>{
                testState[e] = value
            }} 
            onBlur = {(e)=>{
                const error = Validation.checkPincodeValidation(e.target.value);
                if(error.error){
                    testState["error"] = error.error;
                    testState["Pincode"] = "";
                }
            }}
         
            required={true}
            />
        ));
    
        //2. Act
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:"311001"}});
        input.simulate("blur",{target:{value:"311001"}});
        //3. assertion
        expect(testState.Pincode).toEqual("311001");
        expect(testState.error).toEqual(undefined);
    });
});