
export const APP_PAGES = {
    HOME : '/',
    SIGNUP : '/signup',
    SIGNIN : '/signin',
    TABS : '/tabs',
    TABS_SINGLE : '/tabs/:id',
    GROUPS : '/groups',
    GROUPS_SINGLE : '/groups/:name',
    USERS : '/users',
    USERS_SINGLE : '/users/:name',
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
    history.push(APP_PAGES.TABS_SINGLE.replace(':id', id));
}

export function NavigateGroup(history, name) {
    history.push(APP_PAGES.GROUPS_SINGLE.replace(':name', name));
}

export function NavigateUser(history, name) {
    history.push(APP_PAGES.USERS_SINGLE.replace(':name', name));
}