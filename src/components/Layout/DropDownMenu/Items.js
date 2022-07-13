import { ImPlus } from "react-icons/im";
import { HiUserAdd } from "react-icons/hi";
import { FaCalendarPlus, FaColumns, FaPills, FaMicroscope } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { AiFillCalendar, AiFillCamera, AiTwotoneSetting } from "react-icons/ai";
import { RiFileTextFill } from "react-icons/ri";
import { IoMdVideocam } from "react-icons/io";

export const Items = [
    {
        isHidden: true,
        currentPath: "dashboard",
        Icon: <FaColumns className="iconClass1" />,
        path: "/dashboard",
        name: "Dashboard",
        isDivider: false,
        role: "physio"
    },
    {
        isHidden: false,
        currentPath: "pateints",
        Icon: <HiUserAdd className="iconClass1" />,
        path: "/pateints/new",
        name: "New Patient",
        isDivider: false,
        role: "physio"
    },
    {
        isHidden: true,
        currentPath: "pateints",
        Icon: <GrGroup className="iconClass1" />,
        path: "/pateints",
        name: "Patients List",
        isDivider: true,
        role: "physio"
    },
    {
        isHidden: false,
        currentPath: "physio",
        Icon: <HiUserAdd className="iconClass1" />,
        path: "/physio/register",
        name: "New Physio",
        isDivider: false,
        role: "admin"
    },
    {
        isHidden: true,
        currentPath: "physio",
        Icon: <HiUserAdd className="iconClass1" />,
        path: "/physio/clinic/register",
        name: "Clinic Register",
        isDivider: true,
        role: "admin"
    },
    {
        isHidden: true,
        currentPath: "physio",
        Icon: <GrGroup className="iconClass1" />,
        path: "/physio/list",
        name: "Physio List",
        isDivider: true,
        role: "admin"
    },
    {
        isHidden: false,
        currentPath: "visit",
        Icon: <FaCalendarPlus className="iconClass2" />,
        path: "/appointments/new",
        name: "Add Visit",
        isDivider: false,
        role: "physio"
    },
    {
        isHidden: false,
        currentPath: "episode",
        Icon: <ImPlus className="iconClass2" />,
        path: "/add-episode",
        name: "Request Episode",
        role: "physio"
    },
    {
        isHidden: false,
        currentPath: "care",
        Icon: <ImPlus className="iconClass2" />,
        path: "/care-plan",
        name: "Care Plan",
        role: "physio"
    },
    {
        isHidden: true,
        currentPath: "assessment",
        Icon: <ImPlus className="iconClass2" />,
        path: "/assessment/1",
        name: "Request Assessment",
        role: "physio"
    },
    {
        isHidden: true,
        currentPath: "assessment",
        Icon: <AiFillCamera className="iconClass2" />,
        path: "/assessment/1",
        name: "Assessments",
        isDivider: true,
        role: "physio"
    },
    {
        isHidden: false,
        currentPath: "notes",
        Icon: <ImPlus className="iconClass2" />,
        path: "/notes",
        name: "Add Notes",
        isDivider: false,
        role: "physio"
    },
    {
        isHidden: true,
        currentPath: "",
        Icon: <AiTwotoneSetting className="iconClass2" />,
        path: "/setting",
        name: "Settings",
        options:[{
            Icon:<IoMdVideocam className="iconClass2"/>,
            name:"Camera",
        }],
        isDivider: false,
        role: "physio"
    },
    {
        isHidden: true,
        currentPath: "",
        Icon: <AiTwotoneSetting className="iconClass2" />,
        path: "/logout",
        name: "LogOut",
        isDivider: false,
        role: "physio"
    }
];

export const PhysioItems = [
    {
        isHidden: true,
        currentPath: "dashboard",
        Icon: <FaColumns className="iconClass1" />,
        path: "/dashboard",
        name: "Dashboard",
        isDivider: false,
        role: "physio"
    },
    {
        isHidden: false,
        currentPath: "pateints",
        Icon: <HiUserAdd className="iconClass1" />,
        path: "/pateints/new",
        name: "New Patient",
        isDivider: false,
        role: "physio"
    },
    {
        isHidden: true,
        currentPath: "pateints",
        Icon: <GrGroup className="iconClass1" />,
        path: "/pateints",
        name: "Patients List",
        isDivider: true,
        role: "physio"
    },
    {
        isHidden: false,
        currentPath: "visit",
        Icon: <FaCalendarPlus className="iconClass2" />,
        path: "/appointments/new",
        name: "Add Visit",
        isDivider: false,
        role: "physio"
    },
    {
        isHidden: false,
        currentPath: "episode",
        Icon: <ImPlus className="iconClass2" />,
        path: "/add-episode",
        name: "Request Episode",
        role: "physio"
    },
    {
        isHidden: false,
        currentPath: "care",
        Icon: <ImPlus className="iconClass2" />,
        path: "/care-plan",
        name: "Care Plan",
        role: "physio"
    },
    {
        isHidden: true,
        currentPath: "assessment",
        Icon: <AiFillCamera className="iconClass2" />,
        path: "/assessment/1",
        name: "Assessments",
        isDivider: true,
        role: "physio"
    },
    {
        isHidden: false,
        currentPath: "notes",
        Icon: <ImPlus className="iconClass2" />,
        path: "/notes",
        name: "Add Notes",
        isDivider: false,
        role: "physio"
    },
    {
        isHidden: true,
        currentPath: "",
        Icon: <AiTwotoneSetting className="iconClass2" />,
        path: "/setting",
        name: "Settings",
        options:[{
            Icon:<IoMdVideocam className="iconClass2"/>,
            name:"Camera",
        }],
        isDivider: false,
        role: "physio"
    },
    {
        isHidden: true,
        currentPath: "",
        Icon: <AiTwotoneSetting className="iconClass2" />,
        path: "/logout",
        name: "LogOut",
        isDivider: false,
        role: "physio"
    }
];