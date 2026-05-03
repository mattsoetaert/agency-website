"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function LeadConnectorWidget() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="69f6a7909b1858470e4a4e7f"
      data-source="WEB_USER"
      strategy="afterInteractive"
    />
  );
}
