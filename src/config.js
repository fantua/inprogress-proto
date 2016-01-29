const Config = {

    /* UI section */

    /*
        Time in milliseconds to detect double-click after click event. If second click not
        detected - after delay click event will be handled.
     */
    doubleClickDelay: 200,

    /*
        Time in milliseconds to define when the sorting should start. Adding a delay helps
        preventing unwanted drags when clicking on an element.
     */
    dragDelay: 0,

    /*
        Tolerance, in pixels, for when sorting should start. If specified, sorting will not
        start until after mouse is dragged beyond distance. Can be used to allow for clicks
        on elements within a handle.
     */
    dragDistance: 1

};

export default Config;