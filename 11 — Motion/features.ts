/** Motion's DOM feature set, split out so LazyMotion can load it async —
 *  off the initial bundle, on by the time anything scrolls into view. */
import { domAnimation } from "motion/react";
export default domAnimation;
