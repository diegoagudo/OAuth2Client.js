/**
 * OAuth2Client
 * 
 * The MIT License (MIT)
 * 
 * --Diego
 */
const OAuth2Client = function(args) {
    if(!args.hasOwnProperty('host')) {
        console.error('Informe o host');
        return;
    }
    if(!args.hasOwnProperty('clientId')) {
        console.error('Informe o clientId');
        return;
    }
    if(!args.hasOwnProperty('redirectUrl')) {
        console.error('Informe o redirectUrl');
        return;
    }

    const endpointAuthorize = args.hasOwnProperty('endpoint_authorize') || '/oauth/authorize?';
    const endpointCheckSession = args.hasOwnProperty('endpoint_authorize') || '/check-session';

    /**
     * Private: randomString
     *
     * @param length
     * @returns {string}
     */
    function randomString(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    /**
     * Private: queryParams
     * @type {string}
     */
    const queryParams = new URLSearchParams({
        client_id: args.clientId,
        redirect_url: args.redirectUrl,
        response_type: 'code',
        state: randomString(256)
    }).toString();

    const loginUrl        = args.host + endpointAuthorize + queryParams;
    const checkSessionUrl = args.host + endpointCheckSession;
    const fetchOptions    = {
        credentials: 'include'
    };

    return {
        /**
         * getLoginUrl
         * Retorna a URL do autorizador
         *
         * @returns {string}
         */
        getLoginUrl: function() {
            return loginUrl;
        },

        /**
         * Verifica se o cliente está com sessão ativa no autorizador
         * @returns {Promise<any>}
         */
        checkUserLogged: async function() {
            let response = await fetch(checkSessionUrl, fetchOptions);
            return await response.json();
        },

        /**
         * Inicia o processo de autorização transaparente para obtenção do código de acesso
         * @returns {Promise<any>}
         */
        transparentLogin: async function() {
            let response = await fetch(loginUrl, fetchOptions);
            return await response.json();
        }
    }
}