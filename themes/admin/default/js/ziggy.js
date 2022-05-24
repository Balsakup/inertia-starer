const Ziggy = {"url":"http:\/\/inertia-starter.test","port":null,"defaults":{},"routes":{"admin::authenticated_session.create":{"uri":"admin\/login","methods":["GET","HEAD"]},"admin::authenticated_session.store":{"uri":"admin\/login","methods":["POST"]},"admin::authenticated_session.destroy":{"uri":"admin\/logout","methods":["DELETE"]},"admin::dashboard":{"uri":"admin","methods":["GET","HEAD"]},"admin::users.index":{"uri":"admin\/users","methods":["GET","HEAD"]},"admin::users.create":{"uri":"admin\/users\/create","methods":["GET","HEAD"]},"admin::users.store":{"uri":"admin\/users","methods":["POST"]},"admin::users.edit":{"uri":"admin\/users\/{user}","methods":["GET","HEAD"],"bindings":{"user":"id"}},"admin::users.update":{"uri":"admin\/users\/{user}","methods":["PUT"]},"admin::users.destroy":{"uri":"admin\/users\/{user}","methods":["DELETE"]},"admin::user.sendEmailVerification":{"uri":"admin\/user\/{user}\/send-email-verification","methods":["POST"],"bindings":{"user":"id"}}}};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
