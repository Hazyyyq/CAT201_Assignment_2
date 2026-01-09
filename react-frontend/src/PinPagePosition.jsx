import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export default function ScrollToTop() {
    const {pathname} = useLocation();

    useEffect(() => {
        //Scroll to the top left
        window.scrollTo(0, 0);
    }, [pathname]); // This runs every time (the URL) changes

    return null;
}