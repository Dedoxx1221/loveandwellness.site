// ===============================
// Função para capturar cookie
// ===============================
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

// ===============================
// Propagar parâmetros + cookie nos links
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    // Captura cookie rtkclickid-store
    const rtkClickId = getCookie('rtkclickid-store');
    if (rtkClickId) {
        params.set('tid', rtkClickId);
    }
});

// ===============================
// Tracking click afiliado → n8n
// ===============================
(function () {
    var baseUrl = "https://primary-production-2fb2.up.railway.app/webhook/pote";

    function sendTracking(linkHref) {
        try {
            // URL do link clicado
            var urlLink = new URL(linkHref, window.location.origin);
            var searchParams = new URLSearchParams(urlLink.search);

            // Params da URL atual
            var currentUrlParams = new URLSearchParams(window.location.search);

            // Tipo fixo
            searchParams.append('type', 'Pote');

            // Cookie rtkclickid-store
            var rtkClickId = getCookie('rtkclickid-store');
            if (rtkClickId && !searchParams.has('rtkclickid')) {
                searchParams.append('rtkclickid', rtkClickId);
            }

            // Adicionar params da URL atual
            for (var [key, value] of currentUrlParams) {
                if (!searchParams.has(key)) {
                    searchParams.append(key, value);
                }
            }

            // Montar URL final
            var urlComParametros = new URL(baseUrl);
            urlComParametros.search = searchParams.toString();

            // Enviar tracking
            fetch(urlComParametros.href, {
                method: 'GET',
                mode: 'no-cors',
                keepalive: true
            });

            console.log('Tracking enviado:', urlComParametros.href);

        } catch (error) {
            console.error('Erro no tracking:', error);
        }
    }

    // ===============================
    // Listener links afiliados
    // ===============================
    function addClickBankListeners() {
        const domains = [
            'clickbank.net',
            'getmemocore.com',
            'checkout-ds24.com',
            'mycartpanda.com',
            'click',
            'buygoods.com',
            'example.com'
        ];

        const selector = domains.map(d => `a[href*="${d}"]`).join(', ');
        const affiliateLinks = document.querySelectorAll(selector);

        affiliateLinks.forEach(link => {
            if (!link.dataset.trackingAdded) {
                link.addEventListener('click', () => {
                    sendTracking(link.href);
                });
                link.dataset.trackingAdded = 'true';
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener('DOMContentLoaded', addClickBankListeners);
    } else {
        addClickBankListeners();
    }

    // ===============================
    // Observer para links dinâmicos
    // ===============================
    const observer = new MutationObserver(() => {
        addClickBankListeners();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();