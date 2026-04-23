import CookieConsent from "../../components/CookieConsent";

export default function EsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 - Default denied BEFORE GTM loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  'analytics_storage':'denied',
  'ad_storage':'denied',
  'ad_user_data':'denied',
  'ad_personalization':'denied',
  'functionality_storage':'granted',
  'security_storage':'granted',
  'wait_for_update':500
});`,
          }}
        />

        {/* Google Tag Manager - deferred to after user interaction / idle */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var loaded=false;
  function loadGTM(){
    if(loaded)return;loaded=true;
    var w=window,d=document,s='script',l='dataLayer',i='GTM-KZZ9L5VZ';
    w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  }
  if('requestIdleCallback' in window){requestIdleCallback(loadGTM,{timeout:3500});}
  else{setTimeout(loadGTM,3500);}
  ['scroll','click','touchstart','mouseover','keydown'].forEach(function(e){
    window.addEventListener(e,loadGTM,{once:true,passive:true});
  });
})();`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KZZ9L5VZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <CookieConsent locale="es" />
      </body>
    </html>
  );
}
