import { Box } from "@chakra-ui/react";

interface Props {
  handleRemove: any;
  techStack_id: string;
}

const CloseUI = (props: Props) => {
  const { handleRemove, techStack_id } = props;

  function handleClick() {
    handleRemove(techStack_id);
  }

  return (
    <>
      <Box
        onClick={handleClick}
        position={"absolute"}
        top="-0.5"
        right={"-2"}
        mb="50"
        _hover={{
          cursor: "pointer"
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="15"
          height="15"
          viewBox="0 0 172 172"
          style={{fill:"#000000"}}
        >
          <g
            fill="none"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style={{mixBlendMode: "normal"}}
          >
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="#e74c3c">
              <path d="M40.13333,22.93333c-1.46702,0 -2.93565,0.55882 -4.05365,1.67969l-11.46667,11.46667c-2.24173,2.24173 -2.24173,5.87129 0,8.10729l41.81302,41.81302l-41.81302,41.81302c-2.24173,2.24173 -2.24173,5.87129 0,8.10729l11.46667,11.46667c2.24173,2.24173 5.87129,2.24173 8.10729,0l41.81302,-41.81302l41.81302,41.81302c2.236,2.24173 5.87129,2.24173 8.10729,0l11.46667,-11.46667c2.24173,-2.24173 2.24173,-5.87129 0,-8.10729l-41.81302,-41.81302l41.81302,-41.81302c2.24173,-2.236 2.24173,-5.87129 0,-8.10729l-11.46667,-11.46667c-2.24173,-2.24173 -5.87129,-2.24173 -8.10729,0l-41.81302,41.81302l-41.81302,-41.81302c-1.12087,-1.12087 -2.58663,-1.67969 -4.05365,-1.67969z"></path>
            </g>
          </g>
        </svg>
      </Box>
    </>
  );
};

export default CloseUI;
