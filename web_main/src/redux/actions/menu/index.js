import axios from 'axios'

export const getMenu = (idUnit) => {
  return (dispatch, getState) => {
    return axios.get(`http://27.71.228.19:5004/api/menuItem/${idUnit}`).then(response => {
      let unitName = "";
      switch (idUnit) {
        case 1:
          unitName = "Home";
          break;
        case 5:
          unitName = "BDATTT";
          break;
      }
      dispatch({
        type: 'GET_MENU',
        menu: standardNavbar(response.data ? response.data : [],unitName)
      })
    })
  }
}

export const getSidebar = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'GET_SIDEBAR',
      menuSelect: getState().menu.menuSelected
    })
  }
}
export const getBreadCrumb = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'GET_BREADCRUMB',
      breadCrumb: getState().menu.breadCrumb
    })
  }
}
export const updateMenuSelected = (selectedItem, selectedDetail,image) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_SELECTMENU',
      selectedItem: selectedItem,
      selectedDetail: selectedDetail,
      breadCrumbArr: standardBreadCrumb(selectedItem, selectedDetail),
      image: image
    })
  }
}
// export const updateMenuSelected = (selectedItem, selectedDetail) => {
//   return dispatch => {
//     dispatch({
//       type: 'UPDATE_SELECTMENU',
//       selectedItem: selectedItem,
//       selectedDetail: selectedDetail,
//       breadCrumbArr: standardBreadCrumb(selectedItem, selectedDetail),
//       image: standardImage(selectedItem.title)
//     })
//   }
// }
export const updateMenuResearch = (menuResearch) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'UPDATE_RESEARCH',
      menuSelected: menuResearch
    })
  }
}
export const updateMenuPatent = (menuPatent) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'UPDATE_PATENT',
      menuSelected: menuPatent
    })
  }
}
export const updateCategory = (categoryArr = [], selectedDetail = {}) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_CATEGORYNEWS',
      categoryArr: categoryArr,
      selectedDetail: selectedDetail
    })
  }
}
export const updateSelecteDetail = (selectedDetail = {}) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_SELECTEDETAIL',
      selectedDetail: selectedDetail
    })
  }
}
export const updateBreadCrumbNews = (menuArr) => {
  return dispatch => {
    dispatch({
      type: 'UPDATE_BREADCRUMBNEWS',
      breadCrumbArr: menuArr
    })
  }
}

const standardLink = (dataMenu, unitName) => {
  let path = ''
  let flag = false
  if (dataMenu !== null && dataMenu !== [] && dataMenu.length > 0) {
    dataMenu.map((item, index) => {
      if (item.type === "CUSTOM_PAGE" && !flag) {
        path = `/page/Home/` + item.path
        flag = true
      }
    })
  }
  return path
}
const standardNavbar = (dataMenu, unitName) => {
  
  let menuArr = []
  if (dataMenu) {
    dataMenu.map((item, index) => {
      let menuItem = {
        id: item.id,
        url: item.url,
        type: item.type,
        path: item.path ? item.path : "",
        title: item.title,
        children: []
      }
      let flag = false
      if (item.type === "INCLUDE" && item.children !== undefined) {//menu cap 2
        item.children.map((ele, ind) => {
          let childrenItem = {
            id: ele.id,
            url: ele.url,
            type: ele.type,
            path: ele.path ? ele.path : "",
            title: ele.title
          }
          if (ele.type === "INCLUDE" && ele.children !== undefined) {
            childrenItem.path = standardLink(ele.children)
            if (!flag) {//gán cho thằng tiêu đề đường dẫn custompage đầu tiên khi flag là false
              menuItem.path = childrenItem.path
              flag = true
            }
          }
          else if (ele.type === "CUSTOM_PAGE") {
            childrenItem.path = `/page/Home/` + ele.path
            if (!flag) {//gán cho thằng tiêu đề đường dẫn custompage đầu tiên khi flag là false
              menuItem.path = childrenItem.path
              flag = true
            }
          }
          else if (ele.type === "PUBLICATION_COLLECTIONS") {
            childrenItem.path = '/research/list'
            if (!flag) {//gán cho thằng tiêu đề đường dẫn custompage đầu tiên khi flag là false
              menuItem.path = childrenItem.path
              flag = true
            }
          }
          else if (ele.type === "PATENTS_COLLECTIONS") {
            childrenItem.path = '/patent/list'
            if (!flag) {//gán cho thằng tiêu đề đường dẫn custompage đầu tiên khi flag là false
              menuItem.path = childrenItem.path
              flag = true
            }
          }
          else if (ele.type === "PARTNER_COLLECTIONS") {
            childrenItem.path = '/partner/list'
            if (!flag) {//gán cho thằng tiêu đề đường dẫn custompage đầu tiên khi flag là false
              menuItem.path = childrenItem.path
              flag = true
            }
          }
          menuItem.children.push(childrenItem)
        })
      }
      else if (item.type === "CUSTOM_PAGE") {
        menuItem.path = `/page/Home/` + item.path
      }
      menuArr.push(menuItem)
    }
    )
  }

  return menuArr
}
const standardBreadCrumb = (dataAllMenu, dataMenuSelected) => {
  let breadCrumbArr = [
    {
      title: "Home",
      path: "/"
    }
  ]
  let flag = false
  breadCrumbArr.push({
    title: dataAllMenu.title,
    path: dataAllMenu.path
  })
  if (dataAllMenu.type === "INCLUDE" && dataAllMenu.children !== undefined) {
    dataAllMenu.children.map((item, index) => {
      if (item.type === "INCLUDE" && item.children !== undefined && !flag) {
        item.children.map((temp, inde) => {
          if (temp.path === dataMenuSelected.path && !flag) {
            breadCrumbArr.push({
              title: item.title,
              path: item.path
            })
            breadCrumbArr.push({
              title: dataMenuSelected.title,
              path: dataMenuSelected.path
            })
            flag = true
            return breadCrumbArr
          }
        })
      }
      else if (item.path === dataMenuSelected.path && !flag) {
        breadCrumbArr.push({
          title: dataMenuSelected.title,
          path: dataMenuSelected.path
        })
        flag = true
        return breadCrumbArr
      }
    })
  }
  else if (dataAllMenu.path === dataMenuSelected.path && !flag) {
    breadCrumbArr.push({
      title: dataMenuSelected.title,
      path: dataMenuSelected.path
    })
    flag = true
  }
  return breadCrumbArr
}
const standardImage = (title) => {
  let imgLink = [
    {
      src: require('assets/img/custom/slide/3.jpg').default,
      altText: 'MTA Image'
    },
    {
      src: require('assets/img/custom/slide/2.jpg').default,
      altText: 'MTA Image'
    }
  ]
  if (title === undefined) {
    return imgLink
  }
  switch (title.toLowerCase()) {
    case 'about':
      imgLink = [
        {
          src: require('assets/img/custom/slide/3.jpg').default,
          altText: 'MTA Image'
        }
      ]
      break
    case 'academics':
      imgLink = [
        {
          src: require('assets/img/custom/slide/55nam.jpg').default,
          altText: 'MTA Image'
        },
        {
          src: require('assets/img/custom/slide/Acedemic-min.png').default,
          altText: 'MTA Image'
        }
      ]
      break
    case 'research':
      imgLink = [
        {
          src: require('assets/img/custom/slide/55nam.jpg').default,
          altText: 'MTA Image'
        },
        {
          src: require('assets/img/custom/slide/Research-min.png').default,
          altText: 'MTA Image'
        }
      ]
      break
    case 'cooperation':
      imgLink = [
        {
          src: require('assets/img/custom/slide/55nam.jpg').default,
          altText: 'MTA Image'
        },
        {
          src: require('assets/img/custom/slide/Cooperation-min.png').default,
          altText: 'MTA Image'
        }
      ]
      break

    default:
      break
  }
  return imgLink
}
