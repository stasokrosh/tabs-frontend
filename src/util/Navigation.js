
export const APP_PAGES = {
    HOME : '/',
    AUTH : '/auth',
    SIGNUP : '/auth/signup',
    SIGNIN : '/auth/signin',
    TABS : '/tabs',
    TABS_SINGLE : '/tabs/edit/:id',
    TABS_FAVOURITE : '/tabs/favourite/:name',
    GROUPS : '/groups',
    GROUPS_SINGLE : '/groups/info/:name',
    GROUPS_PARTICIPANT : '/groups/participant/:name',
    USERS : '/users',
    USERS_SINGLE : '/users/:name',
}

export function getSingleUserPath(name) {
    return APP_PAGES.USERS_SINGLE.replace(':name', name);
}

export function getSingleGroupPath(name) {
    return APP_PAGES.GROUPS_SINGLE.replace(':name', name);
}

export function getSingleTabPath(id) {
    return APP_PAGES.TABS_SINGLE.replace(':id', id);
}

export function getFavouriteTabsPath(userName) {
    return APP_PAGES.TABS_FAVOURITE.replace(':name', userName);
}

export function getParticipantGroupsPath(userName) {
    return APP_PAGES.GROUPS_PARTICIPANT.replace(':name', userName);
}

export function NavigateHome(history) {
    history.push(APP_PAGES.HOME);
}

export function NavigateSignIn(history) {
    history.push(APP_PAGES.SIGNIN);
}

export function NavigateSignUp(history) {
    history.push(APP_PAGES.SIGNUP);
}

export function NavigateTabList(history) {
    history.push(APP_PAGES.TABS);
}

export function NavigateGroupList(history) {
    history.push(APP_PAGES.GROUPS);
}

export function NavigateUserList(history) {
    history.push(APP_PAGES.USERS);
}

export function NavigateTab(history, id) {
    history.push(getSingleTabPath(id));
}

export function NavigateGroup(history, name) {
    history.push(getSingleGroupPath(name));
}

export function NavigateUser(history, name) {
    history.push(getSingleUserPath(name));
}

export function NavigateFavouriteTabs(history, userName) {
    history.push(getFavouriteTabsPath(userName));
}

export function NavigateParticipantGroups(history, userName) {
    history.push(getParticipantGroupsPath(userName));
}