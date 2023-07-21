---
title: "What Happens In Your Browser When You Search For An URL"
description: This article will try to uncover all those steps that your browser performs once you type in the URL and see the content of that website being displayed on your screen
date: 2023-07-21T17:22:17+05:30
image: 
math: false
license: 
hidden: false
comments: true
draft: false
tags: ["chrome", "javascript", "browser"]
categories: ["Javascript", "Browser"]
---


When you enter a URL (Uniform Resource Locator) in your browser's address bar and hit enter, several steps take place behind the scenes to retrieve and display the requested web page. Here's a high-level overview of what happens in the browser when you search for a URL:

## URL Parsing
The browser parses the URL to understand its components. These components typically include the protocol (e.g., 'http://' or 'https://'), the domain name (e.g., 'example.com'), and any additional path or query parameters.

## DNS Lookup
If the domain name in the URL is not an IP address, the browser needs to resolve it to an IP address using the Domain Name System (DNS). The browser sends a DNS query to a DNS server, which returns the IP address associated with the domain name.

DNS resolution is a critical step in the process of converting human-readable domain names (like "example.com") into their corresponding IP addresses. DNS stands for the Domain Name System, which is a distributed and hierarchical system used to map domain names to IP addresses. This mapping is necessary for computers to locate and communicate with each other over the internet using meaningful domain names instead of remembering long strings of numerical IP addresses.

Let's delve into the DNS resolution process in more detail and see the entire flow

### Request to Resolve the Domain:
When you enter a URL into your browser's address bar, the browser needs to find the IP address associated with the domain name to initiate a connection to the correct web server. If the URL contains a domain name (e.g., "example.com"), the browser will start the DNS resolution process.

### Local DNS Cache Lookup:
The browser first checks its own local DNS cache to see if it has recently queried the IP address for the same domain name. If the domain's IP address is found in the cache, and the cached information is still valid (not expired), the browser can skip the rest of the DNS resolution process and proceed directly to the next steps, saving time and reducing network traffic.

### Recursive DNS Query:
If the domain name is not found in the local cache or the cached information is expired, the browser contacts a DNS resolver provided by your Internet Service Provider (ISP). This DNS resolver is responsible for handling DNS queries on behalf of your device.

### Root DNS Server:
If the DNS resolver doesn't have the IP address for the domain name in its cache, it starts the recursive resolution process. The resolver sends a query to one of the 13 Root DNS Servers on the internet, asking for information about the top-level domain (TLD) of the requested domain (e.g., ".com" in "example.com").

### TLD DNS Server:
The Root DNS Server responds to the resolver with the IP address of the authoritative DNS server responsible for the TLD of the domain name ("com" in this example). The resolver then sends another query, this time to the TLD DNS server, asking for information about the authoritative nameserver responsible for the second-level domain ("example.com" in this example).

### Authoritative Nameserver:
The TLD DNS server responds with the IP address of the authoritative nameserver for "example.com". This authoritative nameserver is typically managed by the domain registrar or the domain owner's DNS provider.

### Final DNS Resolution:
The resolver now sends a final DNS query to the authoritative nameserver for "example.com", asking for the IP address of the domain. The authoritative nameserver responds with the IP address, and the DNS resolver caches this information for a certain period (called the Time To Live or TTL) before returning the IP address to the browser.

Armed with the IP address, the browser can now initiate a TCP connection to the web server hosting "example.com" and proceed with sending the HTTP request to retrieve the requested web page.

It's important to note that DNS resolution happens quickly and is mostly transparent to the user, but it plays a crucial role in enabling the user-friendly experience of navigating the internet using domain names.

## Establishing a TCP Connection
The browser initiates a TCP (Transmission Control Protocol) connection to the web server hosting the requested website. The server is identified by the IP address obtained from the DNS resolution. I will be writing a completely separate article on this topic explaining the three-way handshake as well as the four-way handshake for the TLS connection subsequently if we are using the HTTPS protocol

## Sending an HTTP Request
Once the TCP connection is established, the browser sends an HTTP (Hypertext Transfer Protocol) request to the web server. This request includes the method (usually "GET" for requesting a web page), the specific path on the server, headers, and any other necessary information.

## Server Processing
The web server receives the HTTP request and processes it. This involves locating the requested resource on the server, performing any server-side processing, and generating a response.

## Server Response
The server sends an HTTP response back to the browser. This response contains the requested web page's content (HTML, CSS, JavaScript, etc.) along with relevant HTTP headers, such as status codes, caching instructions, and content type.

## Rendering the Page
Once the browser receives the HTTP response from the web server, which contains the HTML, CSS, and possibly JavaScript code, it begins the process of rendering the web page for display on the screen. Here's a breakdown of what happens during this rendering process:

### Parsing HTML
The browser starts parsing the HTML code to create the Document Object Model (DOM) representation of the web page. The DOM is a tree-like structure that represents the page's structure and content, with each HTML element represented as a node in the tree. The DOM allows the browser to understand the relationships and hierarchies of elements on the page.

### Constructing the DOM Tree
As the browser parses the HTML, it builds the DOM tree by creating nodes for each HTML element and organizing them according to their nesting in the HTML code. For example, a nested `<div>` element inside an `<``section>`` element will be represented as child nodes in the DOM tree.

### Applying CSS Styles
As the DOM tree is constructed, the browser also processes the CSS (Cascading Style Sheets) associated with the web page. CSS is responsible for defining the visual appearance and layout of HTML elements. The browser matches the HTML elements with their corresponding CSS rules and applies the specified styles to each element. This process is known as "CSS rendering" or "layout."

### Rendering the Web Page
With the DOM tree constructed and the CSS styles applied, the browser starts the rendering phase. It goes through the DOM tree and "paints" each element on the screen according to its calculated position, size, and style. This process is known as "painting" or "rendering," and it creates the visual representation of the web page on the screen.

### JavaScript Execution
If the web page contains JavaScript code, the browser executes it during the rendering process. JavaScript can manipulate the DOM, handle user interactions, and dynamically modify the page's content and behavior. JavaScript execution can occur at various points during rendering, depending on where the script is placed in the HTML.

### Asynchronous Loading 
Modern web pages often load additional resources, such as images, scripts, and stylesheets, asynchronously. Asynchronous loading allows the browser to continue rendering and displaying the page while fetching these additional resources in the background. This approach helps improve the perceived performance of the web page by reducing loading times.

### Rendering Continuity: The browser continuously renders the web page as changes occur in the DOM or CSS, such as user interactions, dynamic content updates, or animations. This ensures that the displayed content remains up-to-date and responsive to user actions.

By the end of this rendering process, the web page content is transformed into a visual representation on the screen, and the user can interact with the fully rendered web page, click on links, fill out forms, and perform other actions as intended by the web developers. The rendering process is a complex and multi-step procedure that involves several components of the browser working together to create the user experience. I will write a separate article explaining with code how all of this happens behind the scenes

## Fetching Additional Resources
As the browser parses the page, it may encounter external resources such as images, scripts, stylesheets, and other assets referenced in the HTML. The browser fetches these additional resources from the respective URLs.

## Displaying the Page
Once the browser has processed all the resources and constructed the DOM, it displays the rendered web page on the screen. You can now interact with the page, click links, submit forms, etc.

## Persistent Connections and Caching
Modern browsers often keep persistent connections to web servers and use caching mechanisms to optimize future requests. This allows them to fetch resources more efficiently and reduce loading times for subsequent visits to the same website.