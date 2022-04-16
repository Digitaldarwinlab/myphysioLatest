import { shallow, mount } from 'enzyme';
import Careplan from '../components/care-plan/carePlanIndex';
import { Provider } from 'react-redux';
import store from '../contextStore/store';
import Filter from './../components/care-plan/care-plan-Filters/Filter';
import Cart from './../components/care-plan/care-plan-cart/Cart';
import CarePlanCard from './../components/care-plan/care-plan-card/Card';
import TimePickerComp from './../components/care-plan/care-plan-allocate-plan/TimePickerComp';
import CareAllocatePlan from './../components/care-plan/care-plan-allocate-plan/CareAllocatePlan';


describe("Checking <CarePlan/> Component:-", () => {
    it("Checking CarePlan Rendering test", () => {
        //shallow rendering is used before calling each test (Arrange And Act)
        let wrapper = shallow((
            <Provider store={store}>
                <Careplan />
            </Provider>
        ));
        //Action
        expect(wrapper.exists()).toBe(true);
    });

    it("Checking CarePlan Filter Rendering", () => {
        //Arrange
        const checkedList = {
            muscels: [],
            joints: [],
            difficulty_level: [],
            movement: []
        };
        const filterExercise = async (checked, type, name) => {
            console.log(checked, type, name);
        }
        //Act
        let wrapper = mount((
            <Provider store={store}>
                <Filter checkedList={checkedList} filterExercise={filterExercise} />
            </Provider>
        ));
        //Expect 4 types of filter are present in DOM. (Action)
        expect(wrapper.find("div.ant-collapse-header")).toHaveLength(4)
        expect(wrapper.exists()).toBe(true);
    });

    it("Checking Care Plan Cart Component Rendering", () => {
        //Required Props
        const Exerciselist = [];
        const cartItems = [];
        const ChangePageToAllocatePlan = () => {
            console.log("Changed page to Allocation");
        }
        const UpdateCart = (id) => {
            console.log(id);
        }
        // Cart Mounting
        let wrapper = mount((
            <Cart
                Exercise={Exerciselist}
                items={cartItems}
                UpdateCart={UpdateCart}
                ChangePageToAllocatePlan={ChangePageToAllocatePlan}
            />
        ));
        //Check if Cart Component has 2 Button, Rendered or not.
        expect(wrapper.find("button")).toHaveLength(2)
        expect(wrapper.exists()).toBe(true);
    });

    it("Checking Care Plan Card Component Rendering", () => {
        //Data
        const UpdateCart = (id) => {
            console.log(id);
        }
        //Mounting Component
        let wrapper = mount((
            <Provider store={store}>
                <CarePlanCard
                    cartState={false}
                    id={1}
                    Level="Hard"
                    Name="Push Ups"
                    image="https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3F1YXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    UpdateCart={UpdateCart}
                    actions={true}
                    video=""
                />
            </Provider>
        ));
        //To check if image is present or not.
        expect(wrapper.find("img").exists()).toBe(true);
        expect(wrapper.exists()).toBe(true);
    });

    it("Checking TimePicker Component is Rendered or not.", () => {
        //renderd Data as props
        const handleChange = (key, value, id = 0) => {
            console.log(key, value, id);
        }
        const state = {
            pp_ed_id: "",
            patient_name: "",
            episode_start_date: "",
            complaint: "",
            episode_name: "Neck Pain",
            startDate: "",
            endDate: "",
            exercises: [],
            timeSlots: [],
            isLoading: false,
            count_time_slots: 3,
            success: ""
        }
        //Mount Component.
        let wrapper = mount((
            <TimePickerComp
                state={state}
                handleChange={handleChange}
                key={0}
                index={0}
            />
        ));
        //Check If Icon is having title or not.
        expect(wrapper.find("title").text()).toBe("Click To Change Time");
        expect(wrapper.exists()).toBe(true);
    });

    it("Checking CareAllocatePlan Component is Rendered or not.", () => {
        //Arrange Data as props
        const Exercise = [];
        const items = [];
        //Mount Component. (Act)
        let wrapper = shallow((
            <Provider store={store}>
                <CareAllocatePlan Exercise={Exercise} items={items} />
            </Provider>
        ));
        //Check If Icon is having title or not. (Act)
        expect(wrapper.find("CareAllocatePlan").exists()).toBe(true);
        expect(wrapper.exists()).toBe(true);
    });
})