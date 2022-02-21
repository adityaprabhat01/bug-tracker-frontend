import { Badge, Box, Button, HStack, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { api } from "../../api";
import {
  update_project_techstack_failure,
  update_project_techStack_request,
  update_project_techStack_success,
} from "../../store/selectProject.tsx/selectProjectAction";
import CloseUI from "../CloseUI";

interface Props {
  stack: Array<any>;
}

const TechStack = (props: Props) => {
  const { stack } = props;
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(false);
  const project_id = useSelector(
    (state: RootStateOrAny) => state.project.project._id
  );
  const dispatch = useDispatch();
  function handleAddPreFetch() {
    dispatch(update_project_techStack_request());
  }
  function handleAddPostFetch(data: any) {
    if ("error" in data || "message" in data) {
      handleAddFailure(data);
    }
    dispatch(update_project_techStack_success(data));
  }
  function handleAddFailure(data: any) {
    dispatch(update_project_techstack_failure(data));
  }

  function handleEdit() {
    setEdit(!edit);
  }

  function handleAdd() {
    handleAddPreFetch();
    api
      .post("/updateProjectTechStack", {
        type: "ADD",
        project_id,
        name: value,
      })
      .then((res) => {
        const { data } = res;
        handleAddPostFetch(data);
      })
      .catch((err) => {});
  }

  function handleRemove(techStack_id: string) {
    handleAddPreFetch();
    api
      .post("/updateProjectTechStack", {
        type: "REMOVE",
        project_id,
        techStack_id,
      })
      .then((res) => {
        const { data } = res;
        handleAddPostFetch(data);
      })
      .catch((err) => {});
  }

  return (
    <>
      <Box>
        <Box
          mt={3}
          width={"30px"}
          height={"30px"}
          borderRadius="4px"
          _hover={{
            cursor: "pointer",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 172 172"
            style={{fill:"#000000"}}
            onClick={handleEdit}
          >
            <g
              fill="none"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
              style={{mixBlendMode: "normal"}}
            >
              <path d="M0,172v-172h172v172z" fill="none"></path>
              <g fill="#000000">
                <path d="M162.2304,73.00024l-20.3304,-3.32304c-1.19024,-4.07984 -2.81736,-8.00144 -4.85384,-11.7132l11.868,-16.91448c0.95976,-1.36568 0.79464,-3.22672 -0.38528,-4.41008l-13.37816,-13.37128c-1.19368,-1.19024 -3.07192,-1.34504 -4.44104,-0.35776l-16.65992,11.97464c-3.74616,-2.07088 -7.70216,-3.7152 -11.80608,-4.90888l-3.54664,-20.24784c-0.28896,-1.64432 -1.71656,-2.84832 -3.3884,-2.84832h-18.92c-1.6856,0 -3.12352,1.2212 -3.39528,2.88616l-3.28864,20.13776c-4.128,1.1868 -8.09088,2.81392 -11.82328,4.85728l-16.6152,-11.868c-1.37256,-0.9804 -3.24048,-0.82216 -4.43416,0.36464l-13.37128,13.37128c-1.17992,1.17992 -1.34504,3.03752 -0.38528,4.4032l11.69256,16.72872c-2.0812,3.7668 -3.73928,7.75376 -4.94672,11.9024l-20.05864,3.34024c-1.65808,0.2752 -2.87584,1.71312 -2.87584,3.39184v18.92c0,1.6684 1.19712,3.096 2.838,3.3884l20.05864,3.55696c1.20056,4.13832 2.85864,8.12528 4.94672,11.9024l-11.83704,16.55672c-0.97696,1.36568 -0.82216,3.24048 0.36464,4.43416l13.37472,13.38504c1.17992,1.17992 3.04096,1.34504 4.40664,0.38528l16.7528,-11.73384c3.75992,2.06744 7.73312,3.70832 11.8508,4.89856l3.35744,20.16184c0.27176,1.65464 1.70624,2.86896 3.3884,2.86896h18.92c1.6684,0 3.096,-1.19712 3.38496,-2.838l3.5948,-20.2616c4.12456,-1.21432 8.07712,-2.86552 11.7992,-4.9364l16.8732,11.83704c1.36912,0.96664 3.22672,0.79808 4.41008,-0.38184l13.37472,-13.38504c1.19024,-1.19368 1.34504,-3.07536 0.35776,-4.44448l-12.03312,-16.70808c2.03992,-3.7152 3.66016,-7.64368 4.84008,-11.72352l20.35792,-3.57416c1.64776,-0.28896 2.84488,-1.72 2.84488,-3.3884v-18.92c0.00344,-1.6856 -1.21776,-3.12352 -2.88272,-3.39528zM86,110.08c-13.29904,0 -24.08,-10.78096 -24.08,-24.08c0,-13.29904 10.78096,-24.08 24.08,-24.08c13.29904,0 24.08,10.78096 24.08,24.08c0,13.29904 -10.78096,24.08 -24.08,24.08z"></path>
              </g>
            </g>
          </svg>
        </Box>
        <HStack>
          {stack.map((tech: any) => (
            <Box key={tech._id}>
              <Box key={tech._id} position="relative" mr={2}>
                {edit === true ? (
                  <CloseUI
                    techStack_id={tech._id}
                    handleRemove={handleRemove}
                  />
                ) : null}
                <Badge colorScheme={"blue"}>{tech.name}</Badge>
              </Box>
            </Box>
          ))}
        </HStack>

        {edit === true ? (
          <Box mt={"3"}>
            <Input
              width={"small"}
              variant="flushed"
              onChange={(event) => setValue(event.target.value)}
            />
            <Button ml={"3"} onClick={handleAdd}>
              Update
            </Button>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default TechStack;
