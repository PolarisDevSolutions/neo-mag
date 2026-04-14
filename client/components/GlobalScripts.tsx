import { useEffect, useRef } from "react";
import { useSiteSettings } from "../contexts/SiteSettingsContext";
import { PRERENDER_PAYLOAD_SCRIPT_ID } from "@site/lib/prerenderState";

export default function GlobalScripts() {
  const { settings } = useSiteSettings();
  const skipInitialInjectionRef = useRef(
    typeof document !== "undefined" &&
      document.getElementById(PRERENDER_PAYLOAD_SCRIPT_ID) !== null,
  );

  useEffect(() => {
    if (skipInitialInjectionRef.current) {
      skipInitialInjectionRef.current = false;
      return;
    }

    const injectedElements: HTMLElement[] = [];

    const injectContent = (htmlString: string, target: HTMLElement) => {
      if (!htmlString) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");
      const elements = Array.from(doc.head.childNodes).concat(
        Array.from(doc.body.childNodes),
      );

      elements.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const element = node as HTMLElement;
        let newElement: HTMLElement;

        if (element.tagName.toLowerCase() === "script") {
          const script = document.createElement("script");
          Array.from(element.attributes).forEach((attr) => {
            script.setAttribute(attr.name, attr.value);
          });
          if (script.src) {
            script.async = true;
          }
          script.textContent = element.textContent;
          newElement = script;
        } else {
          newElement = element.cloneNode(true) as HTMLElement;
        }

        target.appendChild(newElement);
        injectedElements.push(newElement);
      });
    };

    if (settings.headScripts) {
      injectContent(settings.headScripts, document.head);
    }

    if (settings.footerScripts) {
      injectContent(settings.footerScripts, document.body);
    }

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

      (window as any).gtag = function () {
        (window as any).dataLayer.push(arguments);
      };
    }

    return () => {
      injectedElements.forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });

      if (settings.ga4MeasurementId) {
        delete (window as any).gtag;
      }
    };
  }, [settings.footerScripts, settings.ga4MeasurementId, settings.headScripts]);

  return null;
}
