import {shallow,mount} from "enzyme";
import Validation from './../components/Validation/authValidation/authValidation';
import FormInput from './../components/UI/antInputs/FormInput';
import ClinicValidation from './../components/Validation/clinicValidation/clinicValidation';
import FormTextArea from './../components/UI/antInputs/FormTextArea';
import FormDate from './../components/UI/antInputs/FormDate';
import moment  from 'moment';

describe("Clinic Registeration Input Testing",()=>{
    it("Clinic Name is Empty",()=>{
        //1. Arrange
        const testState = {name:""};
        const wrapper = shallow((
            <FormInput 
                name="name" 
                label="Name"
                className="formInput"
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
                placeholder="Clinic Name"
                required={true}
            />
        ));
        
        //2. Act
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:""}});
        input.simulate("blur",{target:{value:""}});
        //3. assertion
        expect(testState.name).toEqual("");
        expect(testState.error).toEqual("Name must contain atleast 4 characters.");
    });

    it("Clinic name is not empty,but invalid",()=>{
         //1. Arrange
         const testState = {name:""};
         const wrapper = shallow((
             <FormInput 
                 name="name" 
                 label="Name"
                 className="formInput"
                 value = {testState.name}
                 onChange={(e,value)=>{
                     testState[e] = value
                 }} 
                 onBlur = {(e)=>{
                     const error = Validation.checkNameValidation(e.target.value);
                     if(error.error){
                         testState["error"] = error.error;
                     }
                 }}
                 placeholder="Clinic Name"
                 required={true}
             />
         ));
         
         //2. Act
         const input = wrapper.find("Input");
         input.simulate("change",{target:{value:"@Pharmlogical"}});
         input.simulate("blur",{target:{value:"@Pharmlogical"}});
         //3. assertion
         expect(testState.name).toEqual("@Pharmlogical");
         expect(testState.error).not.toEqual(undefined);
    });

    it("Clinic name is not empty,but valid",()=>{
        //1. Arrange
        const testState = {name:""};
        const wrapper = shallow((
            <FormInput 
                name="name" 
                label="Name"
                className="formInput"
                value = {testState.name}
                onChange={(e,value)=>{
                    testState[e] = value
                }} 
                onBlur = {(e)=>{
                    const error = Validation.checkNameValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                    }
                }}
                placeholder="Clinic Name"
                required={true}
            />
        ));
        
        //2. Act
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:"Pharmlogical"}});
        input.simulate("blur",{target:{value:"Pharmlogical"}});
        //3. assertion
        expect(testState.name).toEqual("Pharmlogical");
        expect(testState.error).toEqual(undefined);
   });

   it("Clinic Pin Code is empty",()=>{
        //1. Arrange
        const testState = {zip:""};
        const wrapper = shallow((
        <FormInput 
            name="zip" 
            label="Pin Code"
            className="formInput"
            value = {testState.zip}
            onChange={(e,value)=>{
                testState[e] = value
            }} 
            onBlur = {(e)=>{
                const error = ClinicValidation.checkPinCodeValidation(e.target.value);
                if(error.error){
                    testState["error"] = error.error;
                    testState["zip"] = "";
                }
            }}
            placeholder="Pin Code"
            required={true}
            />
        ));
    
        //2. Act
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:""}});
        input.simulate("blur",{target:{value:""}});
        //3. assertion
        expect(testState.zip).toEqual("");
        expect(testState.error).toEqual("Zip code Can't be empty field.");
    });


    it("Clinic Pin Code is not empty, but Invalid",()=>{
        //1. Arrange
        const testState = {zip:""};
        const wrapper = shallow((
        <FormInput 
            name="zip" 
            label="Pin Code"
            className="formInput"
            value = {testState.zip}
            onChange={(e,value)=>{
                testState[e] = value
            }} 
            onBlur = {(e)=>{
                const error = ClinicValidation.checkPinCodeValidation(e.target.value);
                if(error.error){
                    testState["error"] = error.error;
                }
            }}
            placeholder="Pin Code"
            required={true}
            />
        ));
    
        //2. Act
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:"3456789"}});
        input.simulate("blur",{target:{value:"3456789"}});
        //3. assertion
        expect(testState.zip).toEqual("3456789");
        expect(testState.error).toEqual("Invalid Pin code");
    });

    it("Clinic Pin Code is not empty, but Valid",()=>{
        //1. Arrange
        const testState = {zip:""};
        const wrapper = shallow((
        <FormInput 
            name="zip" 
            label="Pin Code"
            className="formInput"
            value = {testState.zip}
            onChange={(e,value)=>{
                testState[e] = value
            }} 
            onBlur = {(e)=>{
                const error = ClinicValidation.checkPinCodeValidation(e.target.value);
                if(error.error){
                    testState["error"] = error.error;
                    testState["zip"] = "";
                }
            }}
            placeholder="Pin Code"
            required={true}
            />
        ));
    
        //2. Act
        const input = wrapper.find("Input");
        input.simulate("change",{target:{value:"311001"}});
        input.simulate("blur",{target:{value:"311001"}});
        //3. assertion
        expect(testState.zip).toEqual("311001");
        expect(testState.error).toEqual(undefined);
    });

    it("Clinic Email is Empty",()=>{
        //1. Arrange 
        const testState = {email:""};
        const wrapper = shallow((
            <FormInput name="email" label="Email"
                value={testState.email}
                placeholder="Email" 
                onChange={(e,value)=>{
                    testState[e] = value;
                }}
                onBlur = {(e)=>{
                    const error = Validation.checkEmailValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                    }
                }} 
                required="true"
            />
        ));
        //2. Act 
        const input = wrapper.find("Input");
        input.simulate('change',{target:{value:""}});
        input.simulate('blur',{target:{value:""}});

        //3. Assertion 
        expect(testState.email).toEqual("");
        expect(testState.error).toEqual("Email can't be Empty.");
    });   
    
    it("Clinic Email is Valid",()=>{
        //1. Arrange 
        const testState = {email:""};
        const wrapper = shallow((
            <FormInput name="email" label="Email"
                value={testState.email}
                placeholder="Email" 
                onChange={(e,value)=>{
                    testState[e] = value;
                }}
                onBlur = {(e)=>{
                    const error = Validation.checkEmailValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                    }
                }} 
                required="true"
            />
        ));
        //2. Act 
        const input = wrapper.find("Input");
        input.simulate('change',{target:{value:"pharam34@gmail.com"}});
        input.simulate('blur',{target:{value:"pharam34@gmail.com"}});

        //3. Assertion 
        expect(testState.email).toEqual("pharam34@gmail.com");
        expect(testState.error).toEqual(undefined);
    });



    it("Check Clinic Established Date is Empty" ,()=>{
        //1. Arrange
        let testState = {estab_date:""};
        const wrapper = shallow(
            <FormDate name="estab_date" label="Estb date"
                value={testState.dateState}
                placeholder="Estb date" 
                onChange={(key,value)=>{
                    const error = ClinicValidation.checkClinicDateValidation(value.date.value);
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
        expect(testState.estab_date).toEqual("");
        expect(testState.error).toEqual("Date must be filled.");
    });

    it("Check Clinic Date is filled but, future Date",()=>{
        let testState = {estab_date:""};
        const wrapper = shallow(
            <FormDate name="estab_date" label="Estb date"
                value={testState.dateState}
                placeholder="Estb date" 
                onChange={(key,value)=>{
                    testState[key] = value.date.value;
                    let parsed = moment(value.date.value,"DD/MM/YYYY");
                    const error = ClinicValidation.checkClinicDateValidation(value.date.value);
                    if(error.error){
                        testState["error"] = error.error;
                    }
                }}
                required="true"
            />
        );
        //2. Act 
        const inputDate = wrapper.find("Picker");
        inputDate.simulate("change",{value:"03/04/2022"});
        //3. assertion
        expect(testState.estab_date).not.toEqual("");
        expect(testState.error).toEqual("Date Can't be a future Date.");
    })

    it("Check Clinic Date is filled and Valid Date",()=>{
        let testState = {estab_date:""};
        const wrapper = shallow(
            <FormDate name="estab_date" label="Estb date"
                value={testState.dateState}
                placeholder="Estb date" 
                onChange={(key,value)=>{
                    testState[key] = value.date.value;
                    let parsed = moment(value.date.value,"DD/MM/YYYY");
                    const error = ClinicValidation.checkClinicDateValidation(value.date.value);
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
        expect(testState.estab_date).not.toEqual("");
        expect(testState.error).toEqual(undefined);
    });

    it("Clinic Address 1 is Empty",()=>{
        //1. Arrange
        const testState =  {address_1:""};
        
        const wrapper = shallow((
            <FormTextArea 
                name="address_1" label="Address 1"
                value={testState.address_1}
                placeholder="Address 1" 
                onChange={(e,value)=>{
                    testState[e] = value
                }} 
                onBlur = {(e)=>{
                    const error = Validation.checkAddrValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                        testState["address_1"] = "";
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
        expect(testState.address_1).toEqual("");
        expect(testState.error).toEqual("Please enter your correct Address.");
    })

    it("Clinic Address 1 is not Empty, but less than length 4",()=>{
        //1. Arrange
        const testState =  {address_1:""};
        
        const wrapper = shallow((
            <FormTextArea 
                name="address_1" label="Address 1"
                value={testState.address_1}
                placeholder="Address 1" 
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
        textArea.simulate('change',{target:{value:"234"}});
        textArea.simulate('blur',{target:{value:"234"}});
        //3. assertion
        expect(testState.address_1).not.toEqual("");
        expect(testState.error).toEqual("Please enter your correct Address.");
    })

    it("Clinic Address 1 is not Empty, and Valid",()=>{
        //1. Arrange
        const testState =  {address_1:""};
        
        const wrapper = shallow((
            <FormTextArea 
                name="address_1" label="Address 1"
                value={testState.address_1}
                placeholder="Address 1" 
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
        textArea.simulate('change',{target:{value:"11/320, Azad Nagar"}});
        textArea.simulate('blur',{target:{value:"11/320, Azad Nagar"}});
        //3. assertion
        expect(testState.address_1).toEqual("11/320, Azad Nagar");
        expect(testState.error).toEqual(undefined);
    })
});



    