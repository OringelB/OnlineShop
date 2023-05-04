import { Helmet } from "../../Imports";

function Title({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}
export default Title;