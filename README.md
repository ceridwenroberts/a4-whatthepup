hjk
Assignment 4 - Webpage connecting to an API
Due 27 January 2023 23:59
Instructions
In this assignment we will create a webpage loaded with AJAX data returned from an API.

This is to test your knowledge of JSON objects, AJAX, working with APIs and html/css/js. Vanilla JS, jQuery or both can be used to complete the assignment.

The choice of API is up to you but please keep in mind any keys you might need. You can use XHR or fetch to access the data.

The page needs to have at 

- least one event that triggers the initial API call. 
    This could be a 'start' button, or a 'search' field with submit or something similar. 

- On firing the event an AJAX request is made to an API and data is returned. 

- The data must be a JSON object and not a simple string.

- The data that is returned from the call must be dynamically displayed on the page. 
    You can populate pre-existing elements or dynamically create elements.
    The specifications will depend somewhat on your choice of API.

- Submit both a github pages link and 
- invite me to collaborate on the project.

To achieve a Godkänt grade you must:

- connect to an API in a <user fired event>
- make a <request> for data
- handle the returned data in an <efficient manner>
- display <more than one property> of the returned data on the page
- the page must be <responsive>

To achieve a Välgodkänt grade you must complete the above and:

- Have <correct error handling> when fetching the data
- <Append arguments> to the request
- <Multiple calls> to the API - 
    eg have a input field that will generate different arguments and a button that fires the request
- <Semantic code>
- A <consistent code style># a4-whatthepup



  button {
    --border: .2rem;    /* the border width */
    --color: #37E8FC; /* the color */
    
    font-size: .8rem;
    padding: 0.25em 1.2em;
    cursor: pointer;
    border: none;
    font-weight: bold;
    color: var(--color);
    box-shadow: 
      0 0 0 200px inset var(--c,#0000),
      0 0 0 var(--border) inset var(--color);
    background: #fff linear-gradient(var(--color) 0 0) bottom/100% 0% no-repeat;
    transition: color var(--t,0.3s), background-size 0.3s;
    position: relative;
  }
  button:before,
  button:after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    clip-path: polygon(0 0,100% 0,calc(100% + 200vmax) 200vmax,200vmax calc(100% + 200vmax),0 100%);
    box-shadow: 0 0 0 200vmax var(--color);
    filter: brightness(1.1);
  }
  button:after {
    inset: 0 0 0 auto;
    filter: brightness(0.9);
  }
  button:hover,
  button:active{
    background-size: 100% 100%;
    color: #fff;
    --t: 0.2s 0.1s;
  }
  button:focus-visible {
    outline-offset: calc(-1*var(--border));
    outline: var(--border) solid #000a;
  }
  button:active {
    --c: #0005;
    transform: translate(4px,4px);
    transition: none;
  }
  