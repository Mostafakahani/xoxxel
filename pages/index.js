import Inputs from "Components/Common/Inputs";
import AccountLayout from "Components/Common/Layout/AccountLayout";
import StatusButton from "Components/Common/StatusButton";
import MySwitch from "Components/Common/Switch";
import TableItems from "Components/Common/TableItems";
import TagInput from "Components/Common/TagInput";
import UploadFile from "Components/Common/UploadFile";
import { useState } from "react";

function Home(props) {
  const [selected, setSelected] = useState([]);
  const [tags, setTags] = useState([]);

  return (
    <AccountLayout>
      {/* table items */}
      <TableItems
        selected={selected}
        setSelected={setSelected}
        dataHead={["name", "family"]}
        dataBody={[
          {
            id: 1,
            data: [
              "amir",
              {
                type: "status",
                text: "Waiting",
                color: "warning",
              },
            ],
          },
          {
            id: 3,
            data: [
              "amir",
              {
                type: "status",
                text: "Waiting",
                color: "warning",
              },
            ],
          },
        ]}
      />
      {/* button status */}
      <StatusButton color="success" text="amir" className="amir" />
      {/* input and selected and textarea */}
      <Inputs
        id={"name"}
        label={"user name"}
        onChange={(e) => console.log(e)}
      />
      {/* my switch site */}
      <MySwitch />
      {/* tags  */}
      <TagInput dataTags={tags} setDataTags={(e) => setTags(e)} id="tags" />
      {/* uploader  */}
      <UploadFile
        id={"file1"}
        accept="video/*"
        label={"file read"}
        onChange={(e) => console.log(e)}
      />
    </AccountLayout>
  );
}

export default Home;
