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
    avatarUrl: '/api/purple/cpa/avatar',

    // Client API
    clientUrl: '/api/purple/client',
    accountClientUrl: '/api/purple/client/account',
    accountClientCpaPickListUrl: '/api/purple/client/pick',

    // Product API
    newProductUrl: '/api/purple/product',
    getProductUrl: '/api/purple/product/acc',

    // Template API
    newTemplateUrl: '/api/purple/template',
    getTemplateUrl: '/api/purple/template',
    getTemplateListUrl: '/api/purple/template/acc',

    // Order API
    orderUrl: '/api/purple/order',
    orderAccontUrl: '/api/purple/order/acc',

 // ---------------------------

    // Org Account API
    orgUrl: '/api/purple/account',
    logoUrl: '/api/purple/account/logo',

    // Chat API
    chatUrl: '/api/sm/chat',

    // Kanban API
    actionUrl: '/api/purple/action',
    actionProjectUrl: '/api/purple/action/project',
    actionCommentUrl: '/api/purple/action/comment',
    actionColumnUrl: '/api/purple/action/column',

    // Notification API
    notificationUrl: '/api/sm/notification',

    // Project API
    projectUrl: '/api/purple/project',
    fileUrl: '/api/purple/document',
};
