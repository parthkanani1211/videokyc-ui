// import { createSelector } from "reselect";
// import { 
//     selectCanAccessClients,
//     selectCanAccessUsers, 
//     selectCanAccessStatistics,
//     selectCanAccessDashboardManagement 
// } from "./access";
// import { selectDashboardMenus } from "./dashboards";

// export const selectRoleBasedMenu = createSelector(
//     selectCanAccessClients,
//     selectCanAccessUsers,
//     selectCanAccessStatistics,
//     selectCanAccessDashboardManagement,
//     selectDashboardMenus,
//     (canAccessClients, canAccessUsers, canAccessDashboardManagement, canAccessStatistics, dashboardMenus) => {
//         let baseMenu = {
//             header: {
//                 self: {},
//                 items: [
//                 ]
//             },
//             aside: {
//                 self: {},
//                 items: [
//                     {
//                         title: "Dashboard",
//                         root: true,
//                         icon: "flaticon2-architecture-and-city",
//                         page: "dashboard",
//                         translate: "MENU.DASHBOARD",
//                         bullet: "dot",
//                         submenu: dashboardMenus
//                     }
//                 ],
//             }
//         }

//         if (canAccessClients || canAccessUsers || canAccessDashboardManagement) {
//             baseMenu = {
//                 ...baseMenu,
//                 ...baseMenu.aside.items.push({
//                     title: "Administration",
//                     root: true,
//                     icon: "flaticon2-gear",
//                     translate: "MENU.ADMINISTRATION",
//                     bullet: "dot",
//                     submenu: [],
//                 })
//             }
//         }

//         if (canAccessClients) {
//             baseMenu = {
//                 ...baseMenu,
//                 ...baseMenu.aside.items[1].submenu.push(
//                     {
//                         title: "Clients",
//                         icon: "flaticon-rotate",
//                         page: "admin/clients",
//                     }
//                 )
//             }
//         }

//         if (canAccessUsers) {
//             baseMenu = {
//                 ...baseMenu,
//                 ...baseMenu.aside.items[1].submenu.push(
//                     {
//                         title: "Users",
//                         icon: "flaticon-users",
//                         page: "admin/users",
//                     }
//                 )
//             }
//         }

//         if (canAccessStatistics) {
//             baseMenu = {
//                 ...baseMenu,
//                 ...baseMenu.aside.items[1].submenu.push(
//                     {
//                         title: "Statistics",
//                         icon: "flaticon-statistics",
//                         page: "admin/statistics",
//                     }
//                 )
//             }
//         }

//         if (canAccessDashboardManagement) {
//             baseMenu = {
//                 ...baseMenu,
//                 ...baseMenu.aside.items[1].submenu.push(
//                     {
//                         title: "Dashboards",
//                         icon: "flaticon-imac",
//                         page: "admin/dashboards",
//                     }
//                 )
//             }
//         }

//         return baseMenu;
//     }
// )