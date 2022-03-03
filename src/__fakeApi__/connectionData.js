//
// API endpoints to smartmaster client server
//
export const serverConnection = {
    // server base url -- NEED TO MAKE THIS AUTOMATIC
    baseUrl: 'http://localhost:6543',
//    baseUrl: 'https://api.copper-wired.com',

    slash: '/',

    // Auth API
    loginUrl: '/api/purple/login',
    authUrl: '/api/purple/auth',
    meUrl: '/api/purple/cpa',

    // Cpa API
    cpaUrl: '/api/purple/cpa',
    indCpaUrl: '/api/purple/cpa/ind',

    // Client API
//    clientUrl: '/api/purple/client',
    accountClientUrl: '/api/purple/account/client',

    // Product API
    newProductUrl: '/api/purple/product',

    // Order API
    orderAccontUrl: '/api/sm/order',
//    orderAccontUrl: '/api/purple/order/acc',

 // ---------------------------

    // Org Account API
    orgUrl: '/api/purple/account',

    // Chat API
    chatUrl: '/api/sm/chat',

    // Kanban API
    actionUrl: '/api/sm/action',
    actionClientUrl: '/api/sm/action/client',
    projectClientUrl: '/api/sm/action/project',
    commentClientUrl: '/api/sm/action/comment',

    // Notification API
    notificationUrl: '/api/sm/notification',

    // Project API
    fileUrl: '/api/sm/document',
    clientUrl: '/api/sm/project/client',
    caseUrl: '/api/sm/project',
};
