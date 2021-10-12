import { Provider } from 'react-redux';
import store from '../contextStore/store';
import { shallow,mount} from 'enzyme';
import EpisodeVisitDetails from './../components/episode-visit-details/index';
import Notes from './../components/episode-visit-details/Notes';
import AddButton from './../components/episode-visit-details/AddButton';
import Visits from '../components/episode-visit-details/visits/visit';

describe("Checking <Epsisode-Visit-Details /> (PatientDashboard) Component:- ",()=>{
    it("Dasboard Rendering Test",()=>{
        //Arrange Data as props and Act
        const wrapper = shallow((
            <Provider store={store}>
                <EpisodeVisitDetails />
            </Provider>
        ));
        //Action
        expect(wrapper.exists()).toBe(true);
    });

    it("Dashboard -> Notes Component Rendering",()=>{
        //Arrange 
        let episode_id = 257;
        //Act
        const wrapper = shallow((
            <Notes id={episode_id} />
        ));
        //Action
        //to Check if Submit button is rendered or not
        expect(wrapper.find("Button").text()).toBe("Submit");
        expect(wrapper.exists()).toBe(true);
    });

    it("Dashboard -> AddButton Component Rendering",()=>{
        //Arrange 
        let onClick = ()=>{
            console.log("Hello");
        }
        //Act
        const wrapper = mount((
            <AddButton onClick={onClick} />
        ));
        //Action
        //to Check if Add button is rendered or not
        expect(wrapper.find("Button").text()).toBe("   Add");
        expect(wrapper.exists()).toBe(true);
    });

    it("Dashboard -> Visits Component Rendering",()=>{
        //Arrange 
        let handleClick = ()=>{
            console.log("Hello");
        }
        //Act
        const wrapper = shallow((
            <Provider store={store}> 
                <Visits handleClick={handleClick} patId = "1" change={true} />
            </Provider>
        ));
        //Action
        //to Check if Add button is rendered or not
        expect(wrapper.exists()).toBe(true);
    });

});