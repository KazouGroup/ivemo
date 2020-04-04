export default class Auth {

    constructor(userIvemo) {
        this.userIvemo = userIvemo;
    }

    roles() {

        return this.userIvemo.roles.map(role => role.name);
    }

    permissions() {

        return this.userIvemo.permissions.map(permission => permission.name);
    }


    isSuperAdmin() {
        return this.roles().includes("super-admin");
    }

    isAdmin() {
        return this.roles().includes("admin");
    }

    isAdvertiser() {
        return this.roles().includes("advertiser");
    }

    isEditor() {
        return this.roles().includes("editor");
    }

    isModerator() {
        return this.roles().includes("moderator");
    }

    isVisitor() {
        return this.roles().includes("visitor");
    }

    isUser() {
        return this.roles().includes("user");
    }

    can($permissionName) {
        return this.permissions().includes($permissionName);
    }
}
