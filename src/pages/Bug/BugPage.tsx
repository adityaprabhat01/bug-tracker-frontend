import Bug from "../../components/Bug/Bug";
import useAuthCookies from "../../hooks/useAuthCookies";

const BugPage = () => {
  useAuthCookies();
  return (
    <>
      Bug Page
      <Bug />
    </>
  )
}

export default BugPage;