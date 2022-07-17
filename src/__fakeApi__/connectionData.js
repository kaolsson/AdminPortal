//
// API endpoints to smartmaster client server
//
export const serverConnection = {
    // server base url -- NEED TO MAKE THIS AUTOMATIC
//    baseUrl: 'http://localhost:6543',
    baseUrl: 'https://api.mysmartmaster.com',

    slash: '/',

    // Auth API
    loginUrl: '/api/purple/login',
    authUrl: '/api/purple/auth',
    meUrl: '/api/purple/cpa',

    // My Cpa API
    cpaUrl: '/api/purple/cpa', // get myself, update myself, get all for account
    avatarUrl: '/api/purple/cpa/avatar',

    // Cpa Admin API
    cpaAdminUrl: '/api/purple/cpa/admin', // create, get all
    indCpaUrl: '/api/purple/cpa/ind', // update, delete, get one

    // Client API
    clientUrl: '/api/purple/client',
    accountClientUrl: '/api/purple/client/account',
    accountClientCpaPickListUrl: '/api/purple/client/pick',

    // Product API
    newProductUrl: '/api/purple/product',
    getProductUrl: '/api/purple/product/acc',
    getProductPicklistUrl: '/api/purple/product/pick',

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

    // Message API
    messageUrl: '/api/purple/message',
    messageAccountUrl: '/api/purple/message/acc',

    // Signup API
    signupUrl: '/api/purple/signup',
    signupAccountUrl: '/api/purple/signup/acc',
};
