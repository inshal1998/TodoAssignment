import * as React from "react";
import Svg, { SvgProps, Path, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const FilterIcon = (props: SvgProps) => (
  <Svg
    fill="#000000"
    width="20px"
    height="20px"
    viewBox="0 0 36 36"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Path
      className="clr-i-outline clr-i-outline-path-1"
      d="M33,4H3A1,1,0,0,0,2,5V6.67a1.79,1.79,0,0,0,.53,1.27L14,19.58v10.2l2,.76V19a1,1,0,0,0-.29-.71L4,6.59V6H32v.61L20.33,18.29A1,1,0,0,0,20,19l0,13.21L22,33V19.5L33.47,8A1.81,1.81,0,0,0,34,6.7V5A1,1,0,0,0,33,4Z"
    />
    <Rect x={0} y={0} width={36} height={36} fillOpacity={0} />
  </Svg>
);
export default FilterIcon;
