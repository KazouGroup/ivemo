import { useEffect } from "react";
import ReactGA from 'react-ga';
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        //Scroll To Top
        window.scrollTo(0, 0);

        // key google annalitique
        ReactGA.initialize('UA-170795797-1');
        // To Report Page View
        ReactGA.pageview(pathname + window.location.search);
    }, [pathname]);


     useEffect(() => {
        console.log(pathname)
    });
    return null;
}
export default ScrollToTop;
