// assets
import {  IconWindmill  } from '@tabler/icons';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// constant
const icons = {
  DirectionsCarIcon,
  IconWindmill,
  PersonAddIcon,
  LocalAtmIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //
const userid=localStorage.getItem('id');
const role=localStorage.getItem('role');


// const arrVendor= [
//   {
//     id: 'util-typography',
//     title: 'Not Assigned',
//     type: 'item',
//     url: '/utils/notAssign',
//     icon: icons.LocalAtmIcon,
//     breadcrumbs: false
//   },
//   {
//     id: 'util-assigned',
//     title: 'Assigned',
//     type: 'item',
//     url: '/utils/Assigned',
//     icon: icons.LocalAtmIcon,
//     breadcrumbs: false
//   },
//   {
//     id: 'util-color',
//     title: 'Add New Vender',
//     type: 'item',
//     url: '/utils/newVender',
//     icon: icons.PersonAddIcon,
//     breadcrumbs: false
//   },
//   {
//     id: 'util-shadow',
//     title: 'Add Cars',
//     type: 'item',
//     url: '/utils/NewCar',
//     icon: icons.DirectionsCarIcon,
//     breadcrumbs: false
//   },
//   {
//     id: 'util-VenderCarAssign',
//     title: 'Vender Car form',
//     type: 'item',
//     url: `/utils/VendercarAssign/${venderID}`,
//     icon: icons.DirectionsCarIcon,
//     breadcrumbs: false
//   },
//   {
//     id: 'icons',
//     title: 'Icons',
//     type: 'collapse',
//     icon: icons.IconWindmill,
//     children: [
//       {
//         id: 'tabler-icons',
//         title: 'Tabler Icons',
//         type: 'item',
//         url: '/icons/tabler-icons',
//         breadcrumbs: false
//       },
//       {
//         id: 'material-icons',
//         title: 'Material Icons',
//         type: 'item',
//         external: true,
//         target: '_blank',
//         url: 'https://mui.com/material-ui/material-icons/',
//         breadcrumbs: false
//       }
//     ]
//   }
// ]


const arrVendor= [
  {
    id: 'util-VenderCarAssign',
    title: 'Vender Car form',
    type: 'item',
    url: `/utils/VendercarAssign/${userid}`,
    icon: icons.DirectionsCarIcon,
    breadcrumbs: false
  },
  {
    id: 'icons',
    title: 'Icons',
    type: 'collapse',
    icon: icons.IconWindmill,
    children: [
      {
        id: 'tabler-icons',
        title: 'Tabler Icons',
        type: 'item',
        url: '/icons/tabler-icons',
        breadcrumbs: false
      },
      {
        id: 'material-icons',
        title: 'Material Icons',
        type: 'item',
        external: true,
        target: '_blank',
        url: 'https://mui.com/material-ui/material-icons/',
        breadcrumbs: false
      }
    ]
  }
]

const arrOperator= [
  {
    id: 'util-typography',
    title: 'Not Assigned',
    type: 'item',
    url: `/utils/notAssign/${userid}`,
    icon: icons.LocalAtmIcon,
    breadcrumbs: false
  },
  {
    id: 'util-assigned',
    title: 'Assigned',
    type: 'item',
    url: `/utils/Assigned`,
    icon: icons.LocalAtmIcon,
    breadcrumbs: false
  },
  {
    id: 'util-color',
    title: 'Add New Vender',
    type: 'item',
    url: `/utils/newVender/${userid}`,
    icon: icons.PersonAddIcon,
    breadcrumbs: false
  },
  {
    id: 'util-shadow',
    title: 'Add Cars',
    type: 'item',
    url: `/utils/NewCar/${userid}`,
    icon: icons.DirectionsCarIcon,
    breadcrumbs: false
  },
  {
    id: 'icons',
    title: 'Icons',
    type: 'collapse',
    icon: icons.IconWindmill,
    children: [
      {
        id: 'tabler-icons',
        title: 'Tabler Icons',
        type: 'item',
        url: '/icons/tabler-icons',
        breadcrumbs: false
      },
      {
        id: 'material-icons',
        title: 'Material Icons',
        type: 'item',
        external: true,
        target: '_blank',
        url: 'https://mui.com/material-ui/material-icons/',
        breadcrumbs: false
      }
    ]
  }
]


const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children:role==='Vendor'?arrVendor:arrOperator
};

export default utilities;
