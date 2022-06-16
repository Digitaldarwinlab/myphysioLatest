import {shallow} from "enzyme";
// import {Provider,useSelector,useDispatch} from "react-redux";
// import store from '../contextStore/store';
// import { BrowserRouter as Router} from "react-router-dom";
import Validation from "../components/Validation/authValidation/authValidation";
import FormInput from '../components/UI/antInputs/FormInput';
import FormDate from './../components/UI/antInputs/FormDate';
// import Item from "antd/lib/list/Item";
import moment  from 'moment';
import FormTextArea from './../components/UI/antInputs/FormTextArea';


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
        input.simulate('change',{target:{value:"Mohammed@"}});
        input.simulate('blur',{target:{value:"Mohammed@"}});
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

    it("Check Phone Number is empty",()=>{
        // 1 Arrange
        let teststate ={MobileNo:""};
        const wrapper = shallow(
            <FormInput name="MobileNo" label="MobileNo"
            value={teststate.MobileNo}
            onChange={(e,value)=>{
                    teststate[e] = value
                }} 
            onBlur = {(e)=>{
                    const error = Validation.checkMobNoValidation(e.target.value);
                    if(error.error){
                        teststate["error"] = error.error;
                        teststate["MobileNo"] = ""
                    }
                }}
            required="true"
            />
        );
        // 2 Act
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:""}});
        input.simulate("blur",{target:{value:""}});
        //3. assertion
        expect(teststate.MobileNo).toEqual("");
        expect(teststate.error).not.toEqual(undefined);
    });
    it("Check Phone Number is not empty but valid",()=>{
        // 1 Arrange
        let teststate ={MobileNo:""};
        const wrapper = shallow(
            <FormInput name="MobileNo" label="MobileNo"
            value={teststate.MobileNo}
            onChange={(e,value)=>{
                teststate[e] = value
                }} 
            onBlur = {(e)=>{
                    const error = Validation.checkMobNoValidation(e.target.value);
                    if(error.error){
                        teststate["error"] = error.error;
                        teststate["MobileNo"] = "9901565689"
                    }
                }}
            required="true"
            />
        );
        // 2 Act
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:"9901565689"}});
        input.simulate("blur",{target:{value:"9901565689"}});
        //3. assertion
        expect(teststate.MobileNo).toEqual("9901565689");
        expect(teststate.error).toEqual(undefined);
    });


    it("Check PinCode  is empty",()=>{
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

    

    it("Check Date of Birth is Empty" ,()=>{
        //1. Arrange
        let testState = {DOB:""};
        const wrapper = shallow(
            <FormDate name="DOB" label="DOB"
                value={testState.dateState} 
                onChange={(key,value)=>{
                    const error = Validation.checkDateValidation(value.date.value);
                    if(error.error){
                        testState[key] = "";
                        testState["error"] = error.error;
                    }
                }}
                required="true"
            />
        );
        //2. Act 
        const inputDate = wrapper.find("Picker");
        inputDate.simulate("change",{value:""});
        //3. assertion
        expect(testState.DOB).toEqual("");
        expect(testState.error).toEqual("Date must be filled.");
    });

    it("Check Date of Birth is filled and Valid",()=>{
        let testState = {DOB:""};
        const wrapper = shallow(
            <FormDate name="DOB" label="DOB"
                value={testState.dateState}
                 
                onChange={(key,value)=>{
                    testState[key] = value.date.value;
                    let parsed = moment(value.date.value,"DD/MM/YYYY");
                    const error = Validation.checkDateValidation(value.date.value);
                    if(error.error){
                        testState["error"] = error.error;
                    }
                }}
                required="true"
            />
        );
        //2. Act 
        const inputDate = wrapper.find("Picker");
        inputDate.simulate("change",{value:"03/04/2018"});
        //3. assertion
        expect(testState.DOB).not.toEqual("");
        expect(testState.error).toEqual(undefined); 
    });

    it("Check Address  is Empty",()=>{
        //1. Arrange
        const testState =  {Address:""};
        
        const wrapper = shallow((
            <FormTextArea  
                name="Address" label="Address"
                value={testState.Address}
                onChange={(e,value)=>{
                    testState[e] = value
                }} 
                onBlur = {(e)=>{
                    const error = Validation.checkAddrValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                        testState["Address"] = "";
                    }
                }}
                required={true}
            />
        ));
        //2. Act
        const textArea = wrapper.find("#test-area-id");
        textArea.simulate('change',{target:{value:""}});
        textArea.simulate('blur',{target:{value:""}});
        //3. assertion
        expect(testState.Address).toEqual("");
        expect(testState.error).toEqual("Please enter your correct Address.");
    })

    it(" Address is not Empty, but less than length 4",()=>{
        //1. Arrange
        const testState =  {Address:""};
        
        const wrapper = shallow((
            <FormTextArea 
                name="Address" label="Address"
                value={testState.Address} 
                onChange={(e,value)=>{
                    testState[e] = value
                }} 
                onBlur = {(e)=>{
                    const error = Validation.checkAddrValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                    }
                }}
                required={true}
            />
        ));
        //2. Act
        const textArea = wrapper.find("#test-area-id");
        textArea.simulate('change',{target:{value:"abc"}});
        textArea.simulate('blur',{target:{value:"abc"}});
        //3. assertion
        expect(testState.Address).not.toEqual("");
        expect(testState.error).toEqual("Please enter your correct Address.");
    })

    it("Address is not Empty, and Valid",()=>{
        //1. Arrange
        const testState =  {Address:""};
        
        const wrapper = shallow((
            <FormTextArea 
                name="Address" label="Address"
                value={testState.Address} 
                onChange={(e,value)=>{
                    testState[e] = value
                }} 
                onBlur = {(e)=>{
                    const error = Validation.checkAddrValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                    }
                }}
                required={true}
            />
        ));
        //2. Act
        const textArea = wrapper.find("#test-area-id");
        textArea.simulate('change',{target:{value:"Church road Bhatkal"}});
        textArea.simulate('blur',{target:{value:"Church road Bhatkal"}});
        //3. assertion
        expect(testState.Address).toEqual("Church road Bhatkal");
        expect(testState.error).toEqual(undefined);
    })
});