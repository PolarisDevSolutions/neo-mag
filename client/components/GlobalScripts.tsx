import { useEffect } from "react";
import { useSiteSettings } from "../contexts/SiteSettingsContext";

/**
 * GlobalScripts handles script and tag injection from Site Settings.
 * - Parses and injects headScripts into <head>
 * - Parses and injects footerScripts into <body>
 * - Handles GA4 auto-injection if measurement ID is present
 * - Manually recreates script elements to ensure execution
 * - Cleans up injected elements on unmount or settings change
 */
export default function GlobalScripts() {
  const { settings } = useSiteSettings();

  useEffect(() => {
    const injectedElements: HTMLElement[] = [];

    const injectContent = (htmlString: string, target: HTMLElement) => {
      if (!htmlString) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      const elements = Array.from(doc.head.childNodes).concat(
        Array.from(doc.body.childNodes)
      );

      elements.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const element = node as HTMLElement;
        let newElement: HTMLElement;

        if (element.tagName.toLowerCase() === "script") {
          const script = document.createElement("script");
          // Copy all attributes
          Array.from(element.attributes).forEach((attr) => {
            script.setAttribute(attr.name, attr.value);
          });
          // For scripts with src, always set async to true
          if (script.src) {
            script.async = true;
          }
          // Set script content
          script.textContent = element.textContent;
          newElement = script;
        } else {
          // For other tags like meta, link, noscript, etc.
          newElement = element.cloneNode(true) as HTMLElement;
        }

        target.appendChild(newElement);
        injectedElements.push(newElement);
      });
    };

    // 1. Inject Head Scripts
    if (settings.headScripts) {
      injectContent(settings.headScripts, document.head);
    }

    // 2. Inject Footer Scripts
    if (settings.footerScripts) {
      injectContent(settings.footerScripts, document.body);
    }

    // 3. Handle GA4 Auto-injection
    if (settings.ga4MeasurementId && !(window as any).gtag) {
      const gaScript = document.createElement("script");
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${settings.ga4MeasurementId}`;
      gaScript.async = true;
      document.head.appendChild(gaScript);
      injectedElements.push(gaScript);

      const configScript = document.createElement("script");
      configScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${settings.ga4MeasurementId}');
      `;
      document.head.appendChild(configScript);
      injectedElements.push(configScript);

      // Define gtag on window to prevent double injection and provide standard interface
      (window as any).gtag = function () {
        (window as any).dataLayer.push(arguments);
      };
    }

    // Cleanup: Remove all injected elements
    return () => {
      injectedElements.forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      // Clear gtag from window on cleanup to allow re-injection if ID changes
      if (settings.ga4MeasurementId) {
        delete (window as any).gtag;
      }
    };
  }, [settings.headScripts, settings.footerScripts, settings.ga4MeasurementId]);

  return null; // This component handles DOM side-effects only
}
