
const state = {
    token: sessionStorage.getItem('token') || '',
    // token: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsIlVzZXJJZCI6IjEiLCJzY29wZSI6WyJhbGwiXSwiVXNlclJlYWxOYW1lIjoi6LaF57qn566h55CG5ZGYIiwiZXhwIjoyNDczMzM3MDk0LCJqdGkiOiJhYjViZjEwZi0wNGI2LTQxOTEtOGM2YS00NDVlZGFjNDZkNjIiLCJjbGllbnRfaWQiOiJ1c2VyLXNlcnZpY2UifQ.Az0IySwZZZ7U-UFx3xvaY3L1GjHPp6Gh0WIqabjNvmuxIsMD0YalpbA3coGhOVdpkD_Bw8xvjBs_eh_g_K4KB3W8EPtMULpSEFEzCsy8s0QLrG4m8006p7u4jXvyeyROqk6PSJvIsWTVHCsHIFjfnQiuj4xYs38UkC3C_rFneUZ1GJ8_Xtdvohak-Cv9qsGS59sgS8YqwDye8w37o0dSsiHdzyOuTF8mtIy_mT2v-5FYDbOIr98-nGSy5cXb2LF31TRjoNHhPlXfjboEv-lqP8dGvsK06SH60F_lquxwlY68fDOZgNJEb41uCZNQbIRr8lDNHUpZcZqX7Le4MxOwgg",
    refresh_token: sessionStorage.getItem('refreshToken') || '',
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}, //登录用户基本信息
    menuTree: JSON.parse(sessionStorage.getItem('menuTree')) || [], //菜单目录树
    roleList: JSON.parse(sessionStorage.getItem('roleList')) || [], //用户的角色列表
    title:"",//顶部nav-bar的title
    tabShow:true,//底部tab的显示
    glryCurrentDay: '',//日历选取的日期，针对管理人员端
    glryAllRankTitle: '',//管理人员端， 全部排行榜顶部nav-bar的title
    glryAllRankType: '',//管理人员端， 全部排行榜类别
};

const getters = {};


const mutations = {
    setToken(state, token) {
        state.token = token;
    },
    setRefreshToken(state, refreshToken) {
        state.refresh_token = refreshToken;
    },
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    setXzqhTree(state, treeData) {
        state.xzqhTree = treeData;
    },
    //设置用户功能树
    setUserMenu(state, menuTree) {
        state.menuTree = menuTree;
    },

    setRoleList(state, list) {
        state.roleList = list;
    },
    setTitle(state, title) {
        state.title = title;
    },
    setTab(state, tabShow) {
        state.tabShow = tabShow;
    },
    setGlryCurrentDay(state, glryCurrentDay) {
        state.glryCurrentDay = glryCurrentDay;
    },
    setGlryAllRankTitle(state, glryAllRankTitle) {
        state.glryAllRankTitle = glryAllRankTitle;
    },
    setGlryAllRankType(state, glryAllRankType) {
        state.glryAllRankType = glryAllRankType;
    },
};

const actions = {
    // 登录保存touken
    setTokenAct(context, token) {
        let t = token;
        sessionStorage.setItem('token', t);
        context.commit('setToken', t);
    },
    setUserInfoAct(context, userInfo) {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        context.commit('setUserInfo', userInfo);
    },
    // 退出登录
    logoutAct(context) {
        sessionStorage.clear();
        context.commit('setToken', '');
        context.commit('setRefreshToken', '');
        context.commit('setUserInfo', {});
    },
    //用户功能树
    setUserMenuAct(context, menuTree) {
        sessionStorage.setItem('menuTree', JSON.stringify(menuTree));
        context.commit('setUserMenu', menuTree);
    },
    setRoleListAct(context, list) {
        sessionStorage.setItem('roleList', JSON.stringify(list));
        context.commit('setRoleList', list);
    },
    setTitleAct(context, title) {
        context.commit('setTitle', title);
    },
    setTabAct(context, tabShow) {
        context.commit('setTab', tabShow);
    },
    setGlryCurrentDayAct(context, glryCurrentDay) {
        context.commit('setGlryCurrentDay', glryCurrentDay);
    },
    setGlryAllRankTitleAct(context, glryAllRankTitle) {
        context.commit('setGlryAllRankTitle', glryAllRankTitle);
    },
    setGlryAllRankTypeAct(context, glryAllRankType) {
        context.commit('setGlryAllRankType', glryAllRankType);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}