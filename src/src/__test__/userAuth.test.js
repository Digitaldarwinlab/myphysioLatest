import {shallow} from "enzyme";
import Validation from "../components/Validation/authValidation/authValidation";
import FormInput from '../components/UI/antInputs/FormInput';

describe("Authentication form Input Field testing",()=>{
    it("Check name length should be greater than 4.",()=>{
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
                placeholder="Name"
                required={true}
            />
        ))
        //2 Act
        const input = wrapper.find("Input");
        input.simulate('change',{target:{value:"Hel"}});
        input.simulate('blur',{target:{value:"Hel"}});
        //3. Assert
        expect(testState.name).toEqual("");
        expect(testState.error).toEqual("Name must contain atleast 4 characters.");
    });
    it("Check name should not be empty and not undefined",()=>{
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
                placeholder="Name"
                required={true}
            />
        ))
        //2 Act
        const input = wrapper.find("Input");
        input.simulate('change',{target:{value:"Hello"}});
        input.simulate('blur',{target:{value:"Hello"}});
        //3. Assert
        expect(testState.name).not.toEqual("");
        expect(testState.name).not.toEqual(undefined);
        expect(testState.error).toEqual(undefined);
    });

    it("check name should not contain any Special Character",() => {
        //1. Arrange 
        const testState = {name:""};
        const wrapper = shallow( 
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
                placeholder="Name"
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

    it("Check Email is Empty",() => {
        //1 Arrange
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
        input.simulate('change',{target:{value:""}});
        input.simulate('blur',{target:{value:""}});

        //3 assertion
        expect(testState.error).toEqual("Email can't be Empty.");
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
        input.simulate("change",{target:{value:"swap2001@gmail.com"}});
        input.simulate("blur",{target:{value:"swap2001@gmail.com"}});

        //3. Assertion
        expect(testState.email).toEqual("swap2001@gmail.com");
        expect(testState.error).toEqual(undefined);
    });

    it("Check Password is empty",()=>{
        //1 Arrange 
        const testState = {password:""};
        const wrapper = shallow((
            <FormInput
                name="password" 
                label="Password"
                className="formInput"
                value = {testState.password}
                onChange={(e,value)=>{
                    testState[e] = value
                }} 
                onBlur = {(e)=>{
                    const error = Validation.checkPasswordValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                        testState["password"] = ""
                    }
                }}
                placeholder="Password"
                required={true}
            />
        ));

        //2. Act
        const input = wrapper.find("Input");
        input.simulate('change',{target:{value:""}});
        input.simulate('blur',{target:{value:""}});

        //3 Assertion
        expect(testState.error).toEqual("Password must contain atleast 4 characters.");
        expect(testState.password).toEqual("");
    });
    it("Check Password is not empty but, invalid",()=>{
        const testState = {password:""};
        const wrapper = shallow((
            <FormInput
                name="password" 
                label="Password"
                className="formInput"
                value = {testState.password}
                onChange={(e,value)=>{
                    testState[e] = value
                }} 
                onBlur = {(e)=>{
                    const error = Validation.checkPasswordValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                        testState["password"] = ""
                    }
                }}
                placeholder="Password"
                required={true}
            />
        ));

        //2. Act
        const input = wrapper.find("Input");
        input.simulate('change',{target:{value:"Moass"}});
        input.simulate('blur',{target:{value:"Moass"}});

        //3 Assertion
        expect(testState.error).toEqual("password must contain atleast one number and one special character");
        expect(testState.password).toEqual("");
    });

    it("Check Password is not empty but, valid",()=>{
        const testState = {password:""};
        const wrapper = shallow((
            <FormInput
                name="password" 
                label="Password"
                className="formInput"
                value = {testState.password}
                onChange={(e,value)=>{
                    testState[e] = value
                }} 
                onBlur = {(e)=>{
                    const error = Validation.checkPasswordValidation(e.target.value);
                    if(error.error){
                        testState["error"] = error.error;
                        testState["password"] = ""
                    }
                }}
                placeholder="Password"
                required={true}
            />
        ));

        //2. Act
        const input = wrapper.find("Input");
        input.simulate('change',{target:{value:"Moa@sssas1s"}});
        input.simulate('blur',{target:{value:"Moa@sssas1s"}});

        //3 Assertion
        expect(testState.error).toEqual(undefined);
        expect(testState.password).toEqual("Moa@sssas1s");
    });
});
