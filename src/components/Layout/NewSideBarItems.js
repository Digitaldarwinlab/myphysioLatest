export const  newAdminItems = [
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
        path: "/patients/new",
        name: "New Patient",
        isDivider: false,
        role: "physio"
    },
]